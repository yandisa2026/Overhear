// Overhear backend — a tiny local proxy so the website can generate
// guides for any place without ever exposing your Gemini API key
// to the browser.
//
// Uses Google's Gemini API, which has a genuinely free tier (no credit
// card required) — see backend/README.md for how to get a key.
//
// Run: npm install, then npm start (see README.md for the full walkthrough).

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GEMINI_API_KEY;

// Google renames/retires free-tier model aliases fairly often. Rather than
// hardcode one and break when it's retired, try a short list of known-good
// names in order and remember whichever one works.
const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-pro-latest"
];
let workingModel = null;

async function callGemini(prompt){
  const modelsToTry = workingModel ? [workingModel, ...MODEL_CANDIDATES] : MODEL_CANDIDATES;
  let lastError = null;

  for(const model of modelsToTry){
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    if(response.ok){
      workingModel = model;
      return response;
    }

    if(response.status === 404){
      // this model name isn't available for this key — try the next one
      lastError = { status: 404, text: await response.text() };
      continue;
    }

    // any other error (429, 400, etc.) is worth surfacing immediately
    return response;
  }

  const err = new Error(`No candidate model worked. Last error: ${lastError ? lastError.text : "unknown"}`);
  err.status = 404;
  throw err;
}

app.get("/api/list-models", async (req, res) => {
  if(!API_KEY){
    return res.status(500).json({ error: "No GEMINI_API_KEY set." });
  }
  try{
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: { "x-goog-api-key": API_KEY }
    });
    const data = await response.json();
    if(!response.ok){
      return res.status(response.status).json(data);
    }
    const supported = (data.models || [])
      .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
      .map(m => m.name.replace("models/", ""));
    res.json({ modelsAvailableToYourKey: supported });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/generate-guide", async (req, res) => {
  const query = (req.body && req.body.query || "").trim();
  const language = (req.body && req.body.language) || "en";

  const LANGUAGE_NAMES = { en: "English", es: "Spanish", fr: "French", zh: "Simplified Chinese", ar: "Arabic" };
  const languageName = LANGUAGE_NAMES[language] || "English";

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' in request body." });
  }
  if (!API_KEY) {
    return res.status(500).json({
      error: "No GEMINI_API_KEY found. Copy .env.example to .env and add your key, then restart the server."
    });
  }

  const prompt = `Write a short spoken travel guide about "${query}" for a text-to-speech travel app called Overhear.
Write the entire response — every field including name, teaser, tags, and all section text — in ${languageName}. The JSON keys themselves must stay in English exactly as shown below, only the values should be in ${languageName}.
Respond with ONLY raw JSON, no markdown code fences, no preamble, in exactly this shape:
{"name":"display name","country":"country name","continent":"one of Asia, Africa, Europe, North America, South America, Oceania, Middle East","teaser":"one punchy sentence, under 20 words","tags":["tag1","tag2","tag3"],"sections":[{"title":"Landscape","text":"60-90 words, sensory, specific, factual"},{"title":"Daily life","text":"60-90 words"},{"title":"Culture & ritual","text":"60-90 words"},{"title":"Before you go","text":"40-60 words of practical tips"}]}
The "continent" value must stay one of the English options listed above regardless of the chosen language, so the app can categorize it correctly. If "${query}" isn't a real, identifiable place, still respond with the same JSON shape, but make the teaser gently note that, and keep the sections short and honest instead of inventing false specifics.`;

  try {
    const geminiResponse = await callGemini(prompt);

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errText);
      return res.status(geminiResponse.status).json({
        error: `Gemini API returned ${geminiResponse.status}. Check your API key at aistudio.google.com, or you may have hit the free daily limit — try again in a bit. You can see exactly which models your key supports at http://localhost:${PORT}/api/list-models`
      });
    }

    const data = await geminiResponse.json();
    const text = (data.candidates && data.candidates[0] && data.candidates[0].content
      && data.candidates[0].content.parts.map(p => p.text || "").join("\n")) || "";
    const clean = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseErr) {
      console.error("Failed to parse model output as JSON:", text);
      return res.status(502).json({ error: "The model's response wasn't valid JSON. Try again." });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Server error:", err);
    if(err.status === 404){
      return res.status(404).json({
        error: `None of the usual free-tier model names worked for your key. Check exactly which models your key supports at http://localhost:${PORT}/api/list-models, then tell Claude what it shows.`
      });
    }
    res.status(500).json({ error: "Something went wrong generating the guide. Check the server logs." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, hasApiKey: Boolean(API_KEY) });
});

app.get("/", (req, res) => {
  res.json({
    app: "Overhear API",
    status: "running",
    healthCheck: "/api/health"
  });
});

app.listen(PORT, () => {
  console.log(`Overhear backend running at http://localhost:${PORT}`);
  console.log(API_KEY ? "API key loaded." : "WARNING: no GEMINI_API_KEY set — copy .env.example to .env and add one.");
});
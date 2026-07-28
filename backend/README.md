# Overhear backend

A tiny local server that makes the "Generate a guide" button actually work
on your own machine. It holds your Gemini API key privately on the server,
and the website in the browser never sees it.

Uses **Google's Gemini API**, which has a genuinely free tier — no credit
card required.

## Setup (one-time)

1. **Get a free API key**
   Go to https://aistudio.google.com/apikey, sign in with a Google account,
   and click "Create API key." No billing or credit card needed for the
   free tier.

2. **Add your key**
   In this `backend` folder, copy `.env.example` to a new file named `.env`,
   then paste your key in:
   ```
   GEMINI_API_KEY=your-real-key-here
   ```

3. **Install dependencies**
   Open a terminal in this `backend` folder and run:
   ```
   npm install
   ```

4. **Start the server**
   ```
   npm start
   ```
   You should see:
   ```
   Overhear backend running at http://localhost:3001
   API key loaded.
   ```
   Leave this terminal window running.

## Using it

With the backend running, open the website (`index.html`, e.g. via VS Code's
Live Server) as usual. Search for a place that isn't in the curated list, and
press "Generate a guide" — it will now call your backend, which calls Gemini,
and return a real generated guide.

## Notes

- Keep this terminal window open while you use the site — closing it stops
  the backend and the generate button will fail again (gracefully, with an
  explanation) until you restart it.
- Never commit your `.env` file or share it — it contains your private key.
- The free tier has a daily request limit. If you hit it, generation will
  fail with a clear message — just try again later or the next day.
- When you're ready to put the real website online (not just localhost), this
  backend needs to be deployed somewhere too (e.g. Render, Railway, Fly.io,
  or a serverless function), and the URL in `app.js` (`generateGuideFor`)
  updated from `http://localhost:3001` to your deployed backend's URL.

## Troubleshooting: "Gemini API returned 404"

Google renames and retires its free model aliases fairly often, so a model
name that worked last month can suddenly 404. The server already tries a
few known-good names automatically, but if all of them fail:

1. With the backend running, open this in your browser:
   ```
   http://localhost:3001/api/list-models
   ```
2. You'll see a JSON list of the exact model names your key can use, e.g.
   `"modelsAvailableToYourKey": ["gemini-2.5-flash", "gemini-2.0-flash", ...]`
3. Copy one of those names and share it with Claude, or add it to the top of
   the `MODEL_CANDIDATES` list near the top of `server.js`.
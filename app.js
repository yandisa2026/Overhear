// Overhear — app logic
(function(){
  const filterBar = document.getElementById("filterBar");
  const searchInput = document.getElementById("searchInput");
  const heroSearch = document.getElementById("heroSearch");
  const heroSuggestions = document.getElementById("heroSuggestions");
  const exploreSuggestions = document.getElementById("exploreSuggestions");
  const resultsList = document.getElementById("resultsList");
  const placeView = document.getElementById("placeView");
  const explorePage = document.getElementById("explorePage");
  const trackList = document.getElementById("trackList");
  const placeGallery = document.getElementById("placeGallery");
  const placeName = document.getElementById("placeName");
  const placeCountry = document.getElementById("placeCountry");
  const playAllBtn = document.getElementById("playAllBtn");
  const langSwitcher = document.getElementById("langSwitcher");

  let activeContinent = "All";
  let activeQuery = "";
  let currentDestination = null;
  let currentSections = null;
  let currentUtterance = null;
  let currentLang = localStorage.getItem("overhear-lang") || "en";

  function t(key){
    return (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key])
      || UI_STRINGS.en[key] || key;
  }

  function currentTtsLang(){
    const lang = LANGUAGES.find(l => l.code === currentLang);
    return (lang && lang.ttsLang) || "en-US";
  }

  function applyStaticText(){
    const langMeta = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
    document.documentElement.lang = currentLang;
    document.documentElement.dir = langMeta.rtl ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // The play/stop button label depends on playback state, not just
    // language, so it's re-set explicitly rather than left to the loop above.
    playAllBtn.textContent = playAllBtn.dataset.running === "true" ? t("stop_guide") : t("play_guide");
  }

  function populateLangSwitcher(){
    langSwitcher.innerHTML = LANGUAGES.map(l =>
      `<option value="${l.code}" ${l.code === currentLang ? "selected" : ""}>${l.label}</option>`
    ).join("");
  }

  function setLanguage(lang){
    currentLang = lang;
    localStorage.setItem("overhear-lang", lang);
    applyStaticText();
    renderFilters();
    renderResults();
    if(currentDestination){
      openPlace(currentDestination);
    }
  }

  const continents = ["All", ...new Set(DESTINATIONS.map(d => d.continent))];

  function renderFilters(){
    const names = CONTINENT_NAMES[currentLang] || CONTINENT_NAMES.en;
    filterBar.innerHTML = continents.map(c =>
      `<button class="chip ${c===activeContinent ? "active":""}" data-continent="${c}">${names[c] || c}</button>`
    ).join("");
  }

  function matches(d){
    const q = activeQuery.trim().toLowerCase();
    const inContinent = activeContinent === "All" || d.continent === activeContinent;
    const inQuery = !q ||
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q));
    return inContinent && inQuery;
  }

  function shade(hex){
    const n = parseInt(hex.slice(1),16);
    const r = Math.max(0,(n>>16)-40), g=Math.max(0,((n>>8)&0xff)-40), b=Math.max(0,(n&0xff)-40);
    return `rgb(${r},${g},${b})`;
  }

  // Returns {country, teaser} in the current language for a curated
  // destination, falling back to the English original (from data.js) when
  // no translation exists for that destination/language combo yet.
  function localizedMeta(d){
    const t = DESTINATION_TRANSLATIONS[currentLang] && DESTINATION_TRANSLATIONS[currentLang][d.id];
    return {
      country: (t && t.country) || d.country,
      teaser: (t && t.teaser) || d.teaser
    };
  }

  // Renders every destination that matches the current search + filter.
  // With no query, every destination is shown — the point is that nothing
  // is hidden behind a map or pagination; search just narrows the same list.
  function renderResults(){
    const list = DESTINATIONS.filter(matches);
    if(list.length === 0){
      const q = activeQuery.trim();
      if(!q){
        resultsList.innerHTML = `<p style="color:var(--ink-soft)">${t("no_match")}</p>`;
        return;
      }
      resultsList.innerHTML = `
        <div class="generate-card">
          <p class="eyebrow">${t("no_guide_yet")}</p>
          <h3>${t("generate_prompt")} "${escapeHtml(q)}"?</h3>
          <p>${t("generate_body").replace("{q}", escapeHtml(q))}</p>
          <button class="btn" id="generateBtn" data-query="${escapeHtml(q)}">✨ ${t("generate_button")} "${escapeHtml(q)}"</button>
          <p class="generate-note">${t("generate_note")}</p>
        </div>
      `;
      return;
    }
    resultsList.innerHTML = list.map(d => {
      const meta = localizedMeta(d);
      return `
      <button class="card" data-id="${d.id}">
        <div class="card-art" style="background:linear-gradient(135deg, ${d.accent}, ${shade(d.accent)})" data-art-for="${d.id}">
          <span class="continent-tag">${d.continent}</span>
        </div>
        <div class="card-body">
          <h3>${d.name}</h3>
          <div class="country">${meta.country}</div>
          <p>${meta.teaser}</p>
          <div class="card-tags">
            ${d.tags.map(tag => `<span class="tagpill">${tag}</span>`).join("")}
          </div>
          <div class="card-cta">
            <span class="play-icon">▶</span> ${t("listen_in")}
          </div>
        </div>
      </button>
    `;
    }).join("");

    // Lazily fetch a real photo per visible card and fade it in over the
    // gradient once it arrives, without blocking the initial render.
    list.forEach(async (d) => {
      const url = await fetchCardImage(d);
      if(!url) return;
      const artEl = resultsList.querySelector(`[data-art-for="${d.id}"]`);
      if(!artEl) return; // card no longer in DOM (search changed in the meantime)
      const img = new Image();
      img.onload = () => {
        artEl.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35)), url("${url}")`;
        artEl.style.backgroundSize = "cover";
        artEl.style.backgroundPosition = "center";
      };
      img.src = url;
    });
  }

  function escapeHtml(str){
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- images (Wikipedia + Wikimedia Commons — both free, no API key) ----
  // Works for both curated and AI-generated destinations since it's all
  // live keyword search. Results are cached in memory so re-renders don't
  // re-fetch. Uses fallback chains because a narrow search (e.g. "Sandton
  // South Africa food cuisine") often returns nothing for smaller places —
  // rather than fail silently, we broaden the query step by step.
  const imageCache = {};

  async function fetchCommonsImage(query){
    if(imageCache[query] !== undefined) return imageCache[query];
    try{
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`;
      const res = await fetch(url);
      const data = await res.json();
      const pages = data.query && data.query.pages;
      if(!pages){ imageCache[query] = null; return null; }
      const page = Object.values(pages)[0];
      const info = page && page.imageinfo && page.imageinfo[0];
      imageCache[query] = (info && (info.thumburl || info.url)) || null;
    } catch(err){
      imageCache[query] = null;
    }
    return imageCache[query];
  }

  // Tries each query in order, returns the first one that finds an image.
  async function fetchCommonsImageWithFallback(queries){
    for(const q of queries){
      const url = await fetchCommonsImage(q);
      if(url) return url;
    }
    return null;
  }

  // Wikipedia's summary API reliably returns a place's main lead photo —
  // more consistent than Commons keyword search for a single "hero" shot.
  async function fetchWikipediaLeadImage(title){
    const cacheKey = `wiki:${title}`;
    if(imageCache[cacheKey] !== undefined) return imageCache[cacheKey];
    try{
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      if(!res.ok){ imageCache[cacheKey] = null; return null; }
      const data = await res.json();
      const url = (data.thumbnail && data.thumbnail.source) || (data.originalimage && data.originalimage.source) || null;
      imageCache[cacheKey] = url;
    } catch(err){
      imageCache[cacheKey] = null;
    }
    return imageCache[cacheKey];
  }

  // A single representative photo for a destination card/thumbnail.
  // Wikipedia's lead image first (most reliable), Commons search as backup.
  async function fetchCardImage(d){
    const wiki = await fetchWikipediaLeadImage(d.name);
    if(wiki) return wiki;
    return fetchCommonsImageWithFallback([`${d.name} ${d.country}`.trim(), d.name]);
  }

  // Three photos per destination: the place itself, its food, its culture.
  // Each has a fallback chain so a niche or small place still gets *some*
  // usable photos instead of the gallery quietly showing nothing.
  async function fetchPlaceGallery(name, country){
    const base = `${name} ${country}`.trim();

    const placePromise = (async () => {
      const wiki = await fetchWikipediaLeadImage(name);
      if(wiki) return wiki;
      return fetchCommonsImageWithFallback([`${base} landmark`, base, name]);
    })();

    const foodPromise = fetchCommonsImageWithFallback([
      `${base} food cuisine`, `${name} food`, `${name} cuisine`
    ]);

    const culturePromise = fetchCommonsImageWithFallback([
      `${base} culture festival`, `${name} culture`, `${name} people`, base
    ]);

    const [landscape, food, culture] = await Promise.all([placePromise, foodPromise, culturePromise]);

    return [
      { label: "Place", url: landscape },
      { label: "Food", url: food },
      { label: "Culture", url: culture }
    ].filter(img => img.url);
  }

  // ---- worldwide autocomplete (Photon — free, no API key, OpenStreetMap data) ----
  // Public demo instance from Komoot. Fine for personal/demo traffic; a
  // production site would want its own hosted instance or a paid geocoder.
  async function fetchPlaceSuggestions(query){
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en`);
    if(!res.ok) throw new Error("suggestion lookup failed");
    const data = await res.json();
    return (data.features || []).map(f => {
      const p = f.properties || {};
      const subParts = [p.state, p.country].filter(Boolean);
      return {
        name: p.name || query,
        country: p.country || "",
        label: subParts.join(", ") || (p.osm_value || "")
      };
    }).filter(s => s.name);
  }

  const suggestTimers = { hero: null, explore: null };

  function wireAutocomplete(inputEl, dropdownEl, key){
    inputEl.addEventListener("input", () => {
      const val = inputEl.value;
      clearTimeout(suggestTimers[key]);
      if(val.trim().length < 2){
        dropdownEl.hidden = true;
        dropdownEl.innerHTML = "";
        return;
      }
      dropdownEl.hidden = false;
      dropdownEl.innerHTML = `<div class="suggestion-loading">Searching…</div>`;
      suggestTimers[key] = setTimeout(async () => {
        try{
          const suggestions = await fetchPlaceSuggestions(val);
          if(!dropdownEl.hidden){
            renderSuggestions(dropdownEl, suggestions);
          }
        } catch(err){
          dropdownEl.innerHTML = `<div class="suggestion-empty">Couldn't reach place search — check your connection.</div>`;
        }
      }, 300);
    });

    inputEl.addEventListener("blur", () => {
      // slight delay so a click on a suggestion registers before it's hidden
      setTimeout(() => { dropdownEl.hidden = true; }, 150);
    });
    inputEl.addEventListener("focus", () => {
      if(dropdownEl.innerHTML.trim()) dropdownEl.hidden = false;
    });
  }

  function renderSuggestions(dropdownEl, suggestions){
    if(suggestions.length === 0){
      dropdownEl.innerHTML = `<div class="suggestion-empty">No places found.</div>`;
      return;
    }
    dropdownEl._suggestions = suggestions;
    dropdownEl.innerHTML = suggestions.map((s, i) => `
      <button class="suggestion-item" type="button" data-index="${i}">
        <span class="suggestion-pin">📍</span>
        <span class="suggestion-text">
          <strong>${escapeHtml(s.name)}</strong>
          <span class="suggestion-sub">${escapeHtml(s.label)}</span>
        </span>
      </button>
    `).join("");
  }

  function findCuratedMatch(name){
    const n = name.trim().toLowerCase();
    return DESTINATIONS.find(d =>
      d.name.toLowerCase() === n || d.name.toLowerCase().includes(n) || n.includes(d.name.toLowerCase())
    );
  }

  function selectSuggestion(suggestion){
    const curated = findCuratedMatch(suggestion.name);
    if(curated){
      openPlace(curated.id);
      return;
    }
    openGeneratingPlace(suggestion.name, suggestion.label);
  }

  // Shows the place view immediately with a loading state, then fills it in
  // once the backend (your local Gemini proxy) returns a generated guide.
  async function openGeneratingPlace(name, subtitle){
    currentDestination = null;
    stopSpeaking();
    placeName.textContent = name;
    placeCountry.textContent = subtitle || "Generating guide…";
    trackList.innerHTML = `
      <div class="loading-guide">
        <div class="spinner"></div>
        <p>Writing a spoken guide for ${escapeHtml(name)}…</p>
      </div>
    `;
    explorePage.hidden = true;
    placeView.hidden = false;
    window.scrollTo({top:0, behavior:"smooth"});
    loadGalleryFor(name, subtitle || "");

    try{
      const parsed = await fetchGeneratedGuide(name);
      const generated = buildGeneratedDestination(name, parsed);
      openPlace(generated);
    } catch(err){
      trackList.innerHTML = `
        <div class="loading-guide error">
          <p><strong>Couldn't generate a guide.</strong></p>
          <p>${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }

  // Builds a destination-shaped guide for any place by asking your local
  // backend (see backend/README.md) to generate one. The backend uses
  // Google's free Gemini API and holds the key privately — the browser
  // never sees it.
  // Change this to your deployed backend's URL once it's live (e.g. from
  // Render, Railway, or Fly.io) so generation works for every visitor, not
  // just on your own machine. Until then, it only works locally.
  const API_URL = "https://overhear-1.onrender.com";

  // Calls your local backend (see backend/README.md), which calls Google's
  // free Gemini API and keeps the key private. Throws a friendly error if
  // the backend isn't reachable or returns a problem.
  // Change this to your deployed backend URL
const API_URL = "https://overhear-1.onrender.com";

// Calls the Render backend, which calls Gemini securely
async function fetchGeneratedGuide(query){
  let response;

  try {
    response = await fetch(`${API_URL}/api/generate-guide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        language: currentLang
      })
    });
  } catch (networkErr) {
    throw new Error(
      `Can't reach the backend at ${API_URL}. Please try again later.`
    );
  }

  const parsed = await response.json();

  if (!response.ok) {
    throw new Error(
      parsed.error || `Backend responded with ${response.status}`
    );
  }

  return parsed;
}

  function buildGeneratedDestination(query, parsed){
    const times = ["00:00","00:45","01:30","02:15"];
    return {
      id: "generated-" + Date.now(),
      name: parsed.name || query,
      country: parsed.country || "",
      continent: parsed.continent || "World",
      tags: parsed.tags || [],
      teaser: parsed.teaser || "",
      accent: "#8A6D3B",
      sections: (parsed.sections || []).map((s,i) => ({
        time: times[i] || `0${i}:00`,
        title: s.title,
        durationSec: 40,
        text: s.text
      }))
    };
  }

  async function generateGuideFor(query){
    const btn = document.getElementById("generateBtn");
    const card = document.querySelector(".generate-card");
    if(btn){
      btn.disabled = true;
      btn.textContent = "Writing your guide…";
    }
    try{
      const parsed = await fetchGeneratedGuide(query);
      openPlace(buildGeneratedDestination(query, parsed));
    } catch(err){
      if(card){
        card.innerHTML = `
          <p class="eyebrow">Couldn't generate a guide</p>
          <h3>Something went wrong</h3>
          <p>${escapeHtml(err.message)}</p>
        `;
      }
    }
  }



  function openPlace(idOrDestination){
    const d = typeof idOrDestination === "string"
      ? DESTINATIONS.find(x => x.id === idOrDestination)
      : idOrDestination;
    if(!d) return;
    currentDestination = d;
    stopSpeaking();

    // Curated destinations may have a translated single-paragraph guide for
    // the current language; AI-generated ones (id starts with "generated-")
    // don't have stored translations, so they always use their own sections
    // as returned by the backend (which can itself write in another language
    // — see generateGuideFor).
    const translation = DESTINATION_TRANSLATIONS[currentLang] && DESTINATION_TRANSLATIONS[currentLang][d.id];
    const displayCountry = (translation && translation.country) || d.country;
    const sections = (translation && translation.guide)
      ? [{ time: "00:00", title: t("play_guide").replace(/^[▶❚ ]+/, ""), text: translation.guide }]
      : d.sections;
    currentSections = sections;

    placeName.textContent = d.name;
    placeCountry.textContent = `${displayCountry} · ${d.continent}`;
    trackList.innerHTML = sections.map((s, i) => `
      <div class="track" data-index="${i}">
        <div class="time">${s.time}</div>
        <button class="track-play" data-index="${i}" aria-label="Play ${s.title}">▶</button>
        <div class="track-body">
          <h4>${s.title} <span class="mini-bars"><span></span><span></span><span></span></span></h4>
          <p>${s.text}</p>
        </div>
      </div>
    `).join("");
    explorePage.hidden = true;
    placeView.hidden = false;
    window.scrollTo({top:0, behavior:"smooth"});
    loadGalleryFor(d.name, displayCountry);
  }

  // Shows loading shimmer immediately, then fills in up to 3 real photos
  // (place, food, culture) once Wikimedia Commons responds. Hides itself
  // entirely if nothing usable comes back, rather than showing gaps.
  let galleryToken = 0;
  async function loadGalleryFor(name, country){
    const myToken = ++galleryToken;
    placeGallery.hidden = false;
    placeGallery.innerHTML = `
      <div class="gallery-item shimmer"></div>
      <div class="gallery-item shimmer"></div>
      <div class="gallery-item shimmer"></div>
    `;
    const images = await fetchPlaceGallery(name, country);
    if(myToken !== galleryToken) return; // a newer place was opened meanwhile
    if(images.length === 0){
      placeGallery.innerHTML = `<p class="gallery-empty">No photos found for this place yet.</p>`;
      return;
    }
    placeGallery.innerHTML = images.map(img => `
      <div class="gallery-item">
        <img src="${img.url}" alt="${escapeHtml(img.label)} in ${escapeHtml(name)}" loading="lazy">
        <span class="gallery-label">${escapeHtml(img.label)}</span>
      </div>
    `).join("");
  }

  function closePlace(){
    stopSpeaking();
    placeView.hidden = true;
    explorePage.hidden = false;
  }

  function supportsSpeech(){
    return "speechSynthesis" in window;
  }

  function stopSpeaking(){
    if(supportsSpeech()){
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll(".track").forEach(t => {
      t.classList.remove("active","speaking");
      const btn = t.querySelector(".track-play");
      if(btn){ btn.classList.remove("playing"); btn.textContent = "▶"; }
    });
    playAllBtn.dataset.running = "false";
    playAllBtn.textContent = t("play_guide");
  }

  function speakSection(index, onEnd){
    const section = currentSections[index];
    const trackEl = document.querySelector(`.track[data-index="${index}"]`);
    const btn = trackEl.querySelector(".track-play");

    if(!supportsSpeech()){
      alert("This browser doesn't support built-in narration. Try Chrome, Edge, or Safari.");
      return;
    }

    window.speechSynthesis.cancel();
    document.querySelectorAll(".track").forEach(t => t.classList.remove("active","speaking"));
    document.querySelectorAll(".track-play").forEach(b => { b.classList.remove("playing"); b.textContent = "▶"; });

    trackEl.classList.add("active","speaking");
    btn.classList.add("playing");
    btn.textContent = "❚❚";

    const utter = new SpeechSynthesisUtterance(section.text);
    utter.lang = currentTtsLang();
    utter.rate = 0.98;
    utter.pitch = 1.0;
    currentUtterance = utter;

    utter.onend = () => {
      trackEl.classList.remove("speaking");
      btn.classList.remove("playing");
      btn.textContent = "▶";
      if(onEnd) onEnd();
    };
    utter.onerror = () => {
      trackEl.classList.remove("speaking","active");
      btn.classList.remove("playing");
      btn.textContent = "▶";
    };

    window.speechSynthesis.speak(utter);
  }

  function toggleSection(index){
    const trackEl = document.querySelector(`.track[data-index="${index}"]`);
    const isPlayingThis = trackEl.classList.contains("speaking");
    if(isPlayingThis){
      stopSpeaking();
      return;
    }
    speakSection(index);
  }

  function playAll(){
    if(!currentDestination) return;
    const isRunning = playAllBtn.dataset.running === "true";
    if(isRunning){
      stopSpeaking();
      return;
    }
    playAllBtn.dataset.running = "true";
    playAllBtn.textContent = t("stop_guide");
    let i = 0;
    const step = () => {
      if(i >= currentSections.length){
        playAllBtn.dataset.running = "false";
        playAllBtn.textContent = t("play_guide");
        return;
      }
      const idx = i;
      i++;
      speakSection(idx, step);
    };
    step();
  }

  // ---- events ----
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if(!btn) return;
    activeContinent = btn.dataset.continent;
    renderFilters();
    renderResults();
  });

  resultsList.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if(card){
      openPlace(card.dataset.id);
      return;
    }
    const genBtn = e.target.closest("#generateBtn");
    if(genBtn){
      generateGuideFor(genBtn.dataset.query);
    }
  });

  trackList.addEventListener("click", (e) => {
    const btn = e.target.closest(".track-play");
    if(!btn) return;
    toggleSection(Number(btn.dataset.index));
  });

  playAllBtn.addEventListener("click", playAll);

  document.getElementById("backLink").addEventListener("click", (e) => {
    e.preventDefault();
    closePlace();
  });

  searchInput.addEventListener("input", (e) => {
    activeQuery = e.target.value;
    renderResults();
  });

  heroSearch.addEventListener("input", (e) => {
    activeQuery = e.target.value;
    searchInput.value = e.target.value;
    renderResults();
    document.getElementById("explore").scrollIntoView({behavior:"smooth"});
  });

  document.getElementById("heroCta").addEventListener("click", () => {
    document.getElementById("explore").scrollIntoView({behavior:"smooth"});
  });

  heroSuggestions.addEventListener("mousedown", (e) => {
    const btn = e.target.closest(".suggestion-item");
    if(!btn) return;
    const suggestion = heroSuggestions._suggestions[Number(btn.dataset.index)];
    heroSuggestions.hidden = true;
    heroSearch.value = suggestion.name;
    selectSuggestion(suggestion);
  });

  exploreSuggestions.addEventListener("mousedown", (e) => {
    const btn = e.target.closest(".suggestion-item");
    if(!btn) return;
    const suggestion = exploreSuggestions._suggestions[Number(btn.dataset.index)];
    exploreSuggestions.hidden = true;
    searchInput.value = suggestion.name;
    selectSuggestion(suggestion);
  });

  wireAutocomplete(heroSearch, heroSuggestions, "hero");
  wireAutocomplete(searchInput, exploreSuggestions, "explore");

  // build ambient hero waveform
  const transmission = document.getElementById("transmission");
  const barCount = 28;
  transmission.innerHTML = Array.from({length: barCount}).map((_,i) => {
    const h = 20 + Math.round(Math.sin(i*0.6)*20) + Math.round(Math.random()*40);
    const delay = (i*0.07).toFixed(2);
    return `<div class="bar" style="height:${h}px; animation-delay:${delay}s"></div>`;
  }).join("");

  langSwitcher.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });

  renderFilters();
  renderResults();
  populateLangSwitcher();
  applyStaticText();
})();
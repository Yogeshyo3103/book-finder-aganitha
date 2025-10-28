// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/* ---------- MOOD system ---------- */
const MOOD = {
  love: {
    emoji: "💞",
    light: "#ffdbe6",
    dark: "#ff2d6f",
    aura: "radial-gradient(circle at 20% 20%, #ffd1dc, #fff)",
    quote: "Love is the quiet music between two heartbeats. 💗",
  },
  happy: {
    emoji: "🌈",
    light: "#fff9c4",
    dark: "#ffd600",
    aura: "linear-gradient(135deg,#fff9c4,#fff3a6,#ffe082)",
    quote: "Happiness is a warm page turned with a smile. ☀️",
  },
  sad: {
    emoji: "💧",
    light: "#bbdefb",
    dark: "#1565c0",
    aura: "radial-gradient(circle at 40% 60%, #bbdefb, #e3f2fd)",
    quote: "Sometimes tears water stories that words cannot. 💧",
  },
  thriller: {
    emoji: "💀",
    light: "#e1bee7",
    dark: "#6a1b9a",
    aura: "linear-gradient(135deg,#e1bee7,#9575cd,#6a1b9a)",
    quote: "The darkest pages often hide the brightest twist. ⚡",
  },
  fantasy: {
    emoji: "🧚‍♀️",
    light: "#d1c4e9",
    dark: "#7e57c2",
    aura: "linear-gradient(135deg,#d1c4e9,#9575cd)",
    quote: "Dreams are just stories that escaped reality. ✨",
  },
  sciFi: {
    emoji: "🚀",
    light: "#b2ebf2",
    dark: "#00acc1",
    aura: "radial-gradient(circle at 20% 80%, #b2ebf2,#80deea)",
    quote: "In the galaxy of imagination, every page is a star. 🌌",
  },
  mystery: {
    emoji: "🕵️",
    light: "#e0f7fa",
    dark: "#37474f",
    aura: "linear-gradient(135deg,#cfd8dc,#37474f)",
    quote: "The unknown is the best story hook. 🕯️",
  },
  inspiration: {
    emoji: "✨",
    light: "#e8f5e9",
    dark: "#2e7d32",
    aura: "linear-gradient(135deg,#e8f5e9,#b9f6ca)",
    quote: "A single idea can light a thousand pages. ✨",
  },
  neutral: {
    emoji: "✨",
    light: "#f5f5f5",
    dark: "#9e9e9e",
    aura: "linear-gradient(135deg,#fafafa,#e0e0e0)",
    quote: "Every story begins with a spark of curiosity. ✨",
  },
};

/* ---------- detect mood ---------- */
function detectMood(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.match(/love|romance|heart|kiss/)) return "love";
  if (t.match(/happy|joy|fun|smile|cheer/)) return "happy";
  if (t.match(/sad|tear|lonely|cry|melancholy/)) return "sad";
  if (t.match(/thriller|mystery|crime|suspense/)) return "thriller";
  if (t.match(/fantasy|magic|dragon|wizard|fairy/)) return "fantasy";
  if (t.match(/space|galaxy|future|robot|sci/)) return "sciFi";
  if (t.match(/mystery|detective|clue|whodunit/)) return "mystery";
  if (t.match(/inspire|inspiration|motivate|uplift/)) return "inspiration";
  return null;
}

/* ---------- MAIN APP ---------- */
export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mood, setMood] = useState(null);
  const quoteRef = useRef("");
  const [typedQuote, setTypedQuote] = useState("");

  // ✅ FIXED: run effect on mood (not quoteRef.current)
  useEffect(() => {
    const q = quoteRef.current || "";
    // reset typed quote immediately
    setTypedQuote("");
    if (!q) return;

    let i = 0;
    const interval = 40; // ms per char
    const id = setInterval(() => {
      if (i < q.length) {
        // use charAt to be safe with any string content
        const ch = q.charAt(i);
        setTypedQuote((prev) => prev + ch);
        i++;
      } else {
        clearInterval(id);
      }
    }, interval);

    return () => clearInterval(id);
  }, [mood]);
  // <— only this line changed

  const burst = (emoji, count = 12) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = emoji;
      el.className = "burst-emoji";
      const sx =
        window.innerWidth * 0.2 + Math.random() * window.innerWidth * 0.6;
      el.style.left = sx + "px";
      el.style.top = window.innerHeight - 90 + Math.random() * 40 + "px";
      el.style.fontSize = 12 + Math.floor(Math.random() * 28) + "px";
      el.style.opacity = (0.6 + Math.random() * 0.4).toString();
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2400 + Math.random() * 1000);
    }
  };

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setBooks([]);
    const key = detectMood(query);
    setMood(key);
    quoteRef.current = key ? MOOD[key].quote : MOOD.neutral.quote;
    setTypedQuote("");
    if (key) burst(MOOD[key].emoji, 14);
    else burst(MOOD.neutral.emoji, 10);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 12));
    } catch {
      alert("Network error while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => e.key === "Enter" && searchBooks();

  const moodHeaderStyle = mood
    ? darkMode
      ? { background: MOOD[mood].dark, color: "#fff" }
      : { background: MOOD[mood].light, color: "#000" }
    : null;

  const textShadowFix = {
    textShadow:
      "0 0 6px rgba(0,0,0,0.5), 0 0 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.4)",
  };

  return (
    <div
      className={`app ${darkMode ? "dark" : ""}`}
      style={{
        background: mood
          ? MOOD[mood].aura
          : darkMode
          ? "linear-gradient(180deg,#050014,#000)"
          : "linear-gradient(180deg,#fff,#f7fbff)",
        color: darkMode ? "#fff" : "#0b1220",
        minHeight: "100vh",
        transition: "background 0.9s ease, color 0.4s ease",
      }}
    >
      <div
        className={`orb-toggle ${darkMode ? "orb-dark" : "orb-light"}`}
        title="Switch Reality 🌗"
        onClick={() => setDarkMode((d) => !d)}
      >
        <div className="orb-inner" />
      </div>

      <header className="top" style={moodHeaderStyle || undefined}>
        <h1 className="title" style={textShadowFix}>
          📚 Book Finder
        </h1>
      </header>

      <main>
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Type mood or title — e.g. love, fantasy, thriller, travel"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="search-btn" onClick={searchBooks}>
            🔎 Search
          </button>
        </div>

        {loading ? (
          <div className="loader-wrap">
            <div
              className="holo"
              style={{
                boxShadow: mood
                  ? `0 0 60px 18px ${
                      darkMode ? MOOD[mood].dark : MOOD[mood].light
                    }`
                  : `0 0 60px 18px ${MOOD.neutral.light}`,
              }}
            >
              <div className="ring ring1" />
              <div className="ring ring2" />
              <div className="ring ring3" />
            </div>
            <p className="loader-text">Tuning into your emotion…</p>
          </div>
        ) : (
          <section className="cards">
            {books.length > 0 ? (
              books.map((b, i) => {
                const coverId = b.cover_i;
                const cover = coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                  : null;
                return (
                  <article className="card" key={i} style={textShadowFix}>
                    <div className="card-inner">
                      <div className="card-cover">
                        {!cover && (
                          <div className="no-cover">
                            {mood ? MOOD[mood].emoji : MOOD.neutral.emoji}
                          </div>
                        )}
                        {cover && (
                          <>
                            <div className="shimmer" />
                            <img
                              src={cover}
                              alt={b.title}
                              className="cover-img"
                              onLoad={(e) =>
                                e.currentTarget.classList.add("loaded")
                              }
                            />
                          </>
                        )}
                      </div>
                      <div className="card-body" style={textShadowFix}>
                        <h3 className="card-title" style={textShadowFix}>
                          {b.title}
                        </h3>
                        <p className="card-author">
                          {b.author_name ? b.author_name[0] : "Unknown Author"}
                        </p>
                        <p className="card-year">
                          {b.first_publish_year || "N/A"}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="empty">
                Search for a mood or title and let feeling find a book ✨
              </p>
            )}
          </section>
        )}

        <footer
          className="app-footer"
          style={
            mood
              ? moodHeaderStyle
              : darkMode
              ? { background: "#111", color: "#fff" }
              : { background: "#f0f4ff", color: "#0b1220" }
          }
        >
          <div className="quote" style={textShadowFix}>
            {typedQuote || MOOD.neutral.quote}
          </div>
          <div className="credit" style={textShadowFix}>
            Built with ❤️ and ☕ by <strong>Yogesh S</strong>
            <br />
            <span style={{ opacity: 0.9 }}>
              📧{" "}
              <a
                href="mailto:yogeshyo3103@gmail.com"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                yogeshyo3103@gmail.com
              </a>
            </span>
            <div style={{ opacity: 0.9, fontStyle: "italic" }}>
              Where code meets coder ✨
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

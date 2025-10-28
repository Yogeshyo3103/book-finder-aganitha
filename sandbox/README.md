# 📚 Book Finder — React + Open Library API

> *“Where code meets curiosity.”*

---

## 🧠 Overview
**Book Finder** is a dynamic and minimalistic web application that helps users explore books from the **Open Library API**.  
It enhances the search experience using **mood-based visuals**, **animated quotes**, and **emoji bursts** that react to the emotional tone of the user’s query.  

Whether a user searches for “love stories” or “space adventures,” the app transforms the atmosphere accordingly — creating an engaging, immersive reading mood.

---

## ✨ Key Features
- 🔍 **Smart Book Search** – Fetches real-time results from the Open Library API.  
- 🎭 **Mood Detection System** – Analyzes search text to apply color themes, emojis, and matching quotes.  
- 💬 **Typewriter Quote Animation** – Smooth text reveal for emotional depth.  
- 🌗 **Dark & Light Mode** – Auto-adapts to user preference.  
- 🎇 **Emoji Burst Effect** – Adds delightful visual feedback for every search.  
- ⚙️ **Error Handling** – Graceful fallback messages when no results are found.  
- 📱 **Responsive Design** – Optimized for both mobile and desktop experiences.  

---

## 🧩 Tech Stack
- **Frontend Framework:** React (Vite)  
- **Styling:** Tailwind CSS + Custom Animations  
- **API Source:** [Open Library Search API](https://openlibrary.org/search.json?title={bookTitle})  
- **Deployment:** CodeSandbox  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **AI Assistance:** ChatGPT for problem-solving and optimization  

---

## 🗂️ Folder Structure
src/
├── App.jsx # Core logic: search, mood detection, animation
├── App.css # Styling and gradient effects
├── components/
│ └── BookCard.jsx # Book display component
├── utils/
│ └── detectMood.js # Keyword-based mood detector
└── index.js # React root


---

## 🎨 Mood Configuration Example
```js
const MOOD = {
  love: {
    emoji: "💗",
    light: "#ffdde1",
    dark: "#7d0633",
    aura: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    quote: "Love is the quiet music between two heartbeats. 💗",
  },
  fantasy: {
    emoji: "🪄",
    light: "#e0c3fc",
    dark: "#553c9a",
    aura: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
    quote: "Magic begins where logic ends. 🪄",
  },
  neutral: {
    emoji: "✨",
    light: "#f5f5f5",
    dark: "#9e9e9e",
    aura: "linear-gradient(135deg,#fafafa,#e0e0e0)",
    quote: "Every story begins with a spark of curiosity. ✨",
  },
};

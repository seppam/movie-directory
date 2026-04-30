# 🎬 MovieMania — Movie Directory App

A lightweight, no-auth movie browsing app that lets you search for films, view details, and save favorites — all without signing in. Built with React and powered by the OMDb API.

---

## ✨ Features

### Browse Films
- Home page displays a default catalog of films (default search: "avengers")
- Cards show poster, title, and year with smooth hover effects

### Search
- Real-time search powered by OMDb API
- Type any title and hit **Cari** (Search) to see results

### Film Details
- Full details page: title, year, genre, rating, runtime, country, actors, writer, and plot synopsis
- Back button returns to the previous page

### Favorites (No Sign-In Required)
- Click the heart button (❤️) on any movie card to add/remove from favorites
- Click the favorite button on the detail page to toggle
- Favorites persist across sessions via `localStorage` — no account needed

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Film catalog grid |
| Search | `/search` | Search any movie title |
| Favorites | `/favorites` | Your saved films |
| Detail | `/detail` | Full movie info |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 (Create React App) |
| State Management | Redux Toolkit |
| HTTP Client | Fetch API (native) |
| API | [OMDb API](https://www.omdbapi.com/) (`apikey=dbd0a3df`) |
| Persistence | `localStorage` (favorites) |
| Styling | Inline JS styles (flexbox-based) |
| Build | `react-scripts` (CRA) |

### Architecture

```
src/
├── components/
│   └── MovieCard.js       # Card with poster, info, heart button
├── pages/
│   ├── Home.js            # Film catalog grid
│   ├── Search.js          # Search form + results
│   ├── Favorites.js       # Persisted favorites list
│   └── Detail.js         # Full movie details
├── store/
│   ├── index.js           # Redux store
│   ├── actions/
│   │   └── movieActions.js  # Thunk actions (fetch, add/remove/toggle favorites)
│   └── reducers/
│       └── movieReducer.js   # allMovies, selectedMovie, favorites
├── App.js                 # Page routing via useState
└── index.js              # React DOM + Redux Provider entry point
```

### State Shape

```js
{
  allMovies: [],      // Array of movie objects from search results
  selectedMovie: null, // Full movie detail object
  favorites: []      // Movie objects persisted in localStorage
}
```

### Key Actions

| Action | Thunk | Description |
|--------|-------|-------------|
| `FETCH_MOVIES_SUCCESS` | `fetchMovies(query)` | Search OMDb and store results |
| `FETCH_DETAIL_SUCCESS` | `fetchMovieDetail(id)` | Fetch full detail by IMDb ID |
| `ADD_FAVORITE` | `addFavorite(movie)` | Add movie to favorites |
| `REMOVE_FAVORITE` | `removeFavorite(imdbID)` | Remove movie from favorites |
| `TOGGLE_FAVORITE` | `toggleFavorite(movie)` | Toggle add/remove (used in UI) |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

> Development server runs at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Info

- **Initial commit:** 2026-04-30
- **Build status:** ✅ Compiles successfully
- **No external auth required** — favorites stored in browser localStorage
- **API:** OMDb (free tier, demo key included)

---

## 🌐 Environment

This project was set up and developed using **Antigravity** (VS Code-based IDE on macOS), a development environment configured with:

- Extensions: React Developer Tools, Tailwind CSS, PHP Tools, Python, Jupyter, Dart/Flutter, Go, Java, Ruby, MongoDB, Docker, and more

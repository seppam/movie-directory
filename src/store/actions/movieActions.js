export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const STORAGE_KEY = 'movie_favorites';

// Helper: load favorites from localStorage
export const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: save favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
};

// Fetch movies for a single page
export const fetchMoviesPage = (searchQuery, page) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=dbd0a3df`
      );
      const data = await response.json();
      if (data.Search) {
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: data.Search, meta: { page } });
      }
    } catch (error) {
      console.error('Gagal ambil film:', error);
    }
  };
};

// Fetch all pages 1..5 for "latest movies" query
export const fetchMovies = (searchQuery = '2024') => {
  return async (dispatch) => {
    try {
      const allMovies = [];
      const MAX_PAGES = 5;

      for (let page = 1; page <= MAX_PAGES; page++) {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchQuery}&type=movie&page=${page}&apikey=dbd0a3df`
        );
        const data = await response.json();
        if (data.Search && data.Search.length > 0) {
          allMovies.push(...data.Search);
        } else {
          break; // no more results for this query
        }
      }

      if (allMovies.length > 0) {
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: allMovies });
      }
    } catch (error) {
      console.error('Gagal ambil film:', error);
    }
  };
};

export const fetchMovieDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=dbd0a3df`);
      const data = await response.json();
      dispatch({ type: FETCH_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      console.error('Gagal ambil detail:', error);
    }
  };
};

export const addFavorite = (movie) => {
  return (dispatch, getState) => {
    const favorites = getState().favorites;
    const alreadyAdded = favorites.some((f) => f.imdbID === movie.imdbID);
    if (!alreadyAdded) {
      const updated = [...favorites, movie];
      saveFavoritesToStorage(updated);
      dispatch({ type: ADD_FAVORITE, payload: movie });
    }
  };
};

export const removeFavorite = (imdbID) => {
  return (dispatch, getState) => {
    const updated = getState().favorites.filter((f) => f.imdbID !== imdbID);
    saveFavoritesToStorage(updated);
    dispatch({ type: REMOVE_FAVORITE, payload: imdbID });
  };
};

export const toggleFavorite = (movie) => {
  return (dispatch, getState) => {
    const favorites = getState().favorites;
    const isFav = favorites.some((f) => f.imdbID === movie.imdbID);
    if (isFav) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      const updated = [...favorites, movie];
      saveFavoritesToStorage(updated);
      dispatch({ type: ADD_FAVORITE, payload: movie });
    }
  };
};

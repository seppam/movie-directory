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

export const fetchMovies = (searchQuery = 'avengers') => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=dbd0a3df`);
      const data = await response.json();
      if (data.Search) {
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: data.Search });
      }
    } catch (error) {
      console.error('Waduh, gagal ambil film:', error);
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
  }
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

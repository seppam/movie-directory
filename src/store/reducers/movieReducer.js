import {
  FETCH_MOVIES_SUCCESS,
  FETCH_DETAIL_SUCCESS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  loadFavoritesFromStorage,
} from '../actions/movieActions';

const initialState = {
  allMovies: [],
  selectedMovie: null,
  favorites: loadFavoritesFromStorage(),
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return { ...state, allMovies: action.payload };
    case FETCH_DETAIL_SUCCESS:
      return { ...state, selectedMovie: action.payload };
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.imdbID !== action.payload),
      };
    default:
      return state;
  }
};

export default movieReducer;

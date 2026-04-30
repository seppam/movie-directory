import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Si kurir otomatis
import movieReducer from './reducers/movieReducer';

const store = createStore(movieReducer, applyMiddleware(thunk));

export default store;
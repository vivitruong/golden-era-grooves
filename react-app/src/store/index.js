import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import playlistReducer from './playlist';
import songReducer from './song';
import userSongReducer from './userSong';
import playerReducer from './player';
import queueReducer from './queue';
// import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import playlistsSliceReducer from '../slices/playlistsSlice';
import { songsSliceReducer, playSongSliceRducer, likedSongSliceRducer } from '../slices/songsSlice';



const rootReducer = combineReducers({
  session,
  [ apiSlice.reducerPath ]: apiSlice.reducer,
  playlists: playlistsSliceReducer,
  songs: songsSliceReducer,
  playSong: playSongSliceRducer,
  likedSongs: likedSongSliceRducer,
  // playlists: playlistReducer,
  // songs: songReducer,
  // userSongs: userSongReducer,
  // player: playerReducer,
  // queue: queueReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

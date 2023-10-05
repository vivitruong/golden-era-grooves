import { createSlice } from '@reduxjs/toolkit';


const playSongSlice = createSlice({
  name: 'song',
  initialState: {
    playSong: null,
    isPlaying: false,
    currentSongIndex: 0,
    isLiked: null,
  },
  reducers: {
    playSong: (state, action) => {
      state.playSong = action.payload.song;
      state.currentSongIndex = action.payload.index;
      state.isLiked = action.payload.song.isLiked;
    },
    playAudio: (state) => {
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },

    nextSong: (state, action) => {
      // const { currentSongIndex } = state;
      // const nextIndex = currentSongIndex + 1;

      // if (nextIndex < action.payload.songs.length) {
      //   state.currentSongIndex = nextIndex;
      //   state.playSong = action.payload.songs[ nextIndex ];
      // } else {
      //   state.currentSongIndex = 0;

      // }
      const { currentSongIndex } = state;
      const nextIndex = currentSongIndex + 1;

      if (nextIndex < action.payload.songs.length) {
        state.currentSongIndex = nextIndex;
      } else {
        state.currentSongIndex = 0;
      }
      state.playSong = action.payload.songs[ state.currentSongIndex ];
    },

    pervSong: (state, action) => {
      // const { currentSongIndex } = state;
      // const nextIndex = currentSongIndex - 1;

      // if (nextIndex >= 0) {
      //   state.currentSongIndex = nextIndex;
      //   state.playSong = action.payload.songs[ nextIndex ];
      // } else {
      //   state.currentSongIndex = 0;
      //   state.playSong = action.payload.songs[ 0 ];
      // }
      const { currentSongIndex } = state;
      const prevIndex = currentSongIndex - 1;

      if (prevIndex >= 0) {
        state.currentSongIndex = prevIndex;
      } else {
        state.currentSongIndex = action.payload.songs.length - 1;
      }
      state.playSong = action.payload.songs[ state.currentSongIndex ];
    }
  }
});



export const { playSong, pauseAudio, playAudio, nextSong, pervSong } = playSongSlice.actions;
export const playSongSliceRducer = playSongSlice.reducer;
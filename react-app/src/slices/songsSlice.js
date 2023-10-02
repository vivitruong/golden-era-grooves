import { createSlice } from '@reduxjs/toolkit';


const songsSlice = createSlice({
  name: 'songs',
  initialState: { songs: [], allSongs: [], currentPlayList: null },
  reducers: {
    getSongs: (state, action) => {
      state.songs = action.payload.songs;
      // const { playlistName, playlists } = action.payload;
      // const selectedPlaylistName = playlistName;
      // const selectedPlaylist = playlists.find(
      //   (playlist) => playlist.name === selectedPlaylistName
      // );

      // if (selectedPlaylist) {
      //   state.songs = selectedPlaylist.songs;
      //   state.currentPlayList = selectedPlaylist;
      // } else {
      //   state.songs = [];
      // }
    },
    getAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    playSong: (state, action) => {
      console.log(action.payload);
    }
  },
});

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

const likedSongSlice = createSlice({
  name: 'likedSongs',
  initialState: {
    likedSong: [],
  },
  reducers: {
    likeSong: (state, action) => {
      const songToAdd = action.payload;
      const isSongAlreadyLiked = state.likedSong.some(song => song.id === songToAdd.id);

      if (!isSongAlreadyLiked) {
        state.likedSong.push(songToAdd);
      } else {
        state.likedSong = state.likedSong.filter(song => song.id !== songToAdd.id);
      }
    }
  }
});

export const { getSongs, getAllSongs } = songsSlice.actions;
export const { playSong, pauseAudio, playAudio, nextSong, pervSong } = playSongSlice.actions;
export const { likeSong } = likedSongSlice.actions;

export const songsSliceReducer = songsSlice.reducer;
export const playSongSliceRducer = playSongSlice.reducer;
export const likedSongSliceRducer = likedSongSlice.reducer;

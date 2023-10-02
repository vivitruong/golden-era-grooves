import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLocalData = createAsyncThunk(
  "data/fetchLocalData",
  async () => {
    const response = await fetch("/songs.json");
    const data = await response.json();
    return data;

  }
);

const playListSlice = createSlice({
  name: "data",
  initialState: {
    playlists: [],
    selectedPlayListSongs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    selectedPlayListSongs: (state, action) => {
      console.log(action.payload);
      state.selectedPlayListSongs = action.payload;
    },
    addSongToSelectedPlayList: (state, action) => {
      const { playlist, addSong } = action.payload;

      const isSongInPlaylist = playlist.playlist_songs.some(song => song.song.name === addSong.song.name);
      if (!isSongInPlaylist) {
        const updatedPlaylist = {
          ...playlist,
          playlist_songs: [ ...playlist.playlist_songs, addSong ],
        };

        state.selectedPlayListSongs = updatedPlaylist;
      } else {
        console.log("Song with the same name already exists in the playlist.");
      }
    },
    removeSongToSelectedPlayList: (state, action) => {
      const { playlist, removeSong } = action.payload;

      // Find the index of the song to be removed
      const songIndex = playlist.playlist_songs.findIndex(song => song.song.name === removeSong.song.name);

      if (songIndex !== -1) {
        const updatedPlaylist = {
          ...playlist,
          playlist_songs: [
            ...playlist.playlist_songs.slice(0, songIndex),
            ...playlist.playlist_songs.slice(songIndex + 1),
          ],
        };

        state.selectedPlayListSongs = updatedPlaylist;
      } else {
        console.log("Song with the same name does not exist in the playlist.");
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocalData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlists = action.payload.playlists;
      })
      .addCase(fetchLocalData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});



export const { selectedPlayListSongs, removeSongToSelectedPlayList, addSongToSelectedPlayList } = playListSlice.actions;

export default playListSlice.reducer;

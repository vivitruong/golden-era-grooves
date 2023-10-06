import { PLAYLIST_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const playlistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query({
      query: () => ({
        url: PLAYLIST_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getCurrentUserPlayList: builder.query({
      query: () => ({
        mode: 'no-cors',
        url: `${ PLAYLIST_URL }/current`
      }),
      keepUnusedDataFor: 5,

    }),

    createPlayList: builder.mutation({
      query: (data) => ({
        url: PLAYLIST_URL,
        method: 'POST',
        body: data,
      })
    }),
    updatePlayList: builder.mutation({
      query: (data) => ({
        url: `${ PLAYLIST_URL }/${ data.id }`,
        method: 'PUT',
        body: data.body,
      })
    }),
    addSongToPlayList: builder.mutation({
      query: (data) => ({
        url: `${ PLAYLIST_URL }/${ data.playListId }/songs`,
        method: 'POST',
        body: data.body,
      })
    }),
    removeASongFromPlayList: builder.mutation({
      query: (data) => ({
        url: `${ PLAYLIST_URL }/songs/${ data.playlistId }/${ data.songId }`,
        method: 'DELETE',

      })
    }),
    deletePlayList: builder.mutation({
      query: (data) => ({
        url: `${ PLAYLIST_URL }/${ data.playListId }`,
        method: 'DELETE'
      })
    })
  })
});


export const { useGetAllPlaylistsQuery, useGetCurrentUserPlayListQuery, useAddSongToPlayListMutation, useCreatePlayListMutation, useDeletePlayListMutation, } = playlistsApiSlice;

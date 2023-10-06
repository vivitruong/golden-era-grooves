const LOAD_ALL = 'playlist/loadAll';
const LOAD_USERPLAYLISTS = 'playlist/loadUserPlaylists';
const ADD_PLAYLIST = 'playlist/addPlaylist';
const REMOVE_PLAYLIST = 'playlist/removePlaylist';
const EDIT_PLAYLIST = 'playlist/editPlaylist';
const ADD_SONG = 'playlist/addSong';
const REMOVE_SONG = 'playlist/removeSong';


// Action Creators
export const getUserPlaylists = (userPlaylists) => {
    return {
        type: LOAD_USERPLAYLISTS,
        payload: userPlaylists,
    };
};

export const createPlaylist = (newPlaylist) => {
    return {
        type: ADD_PLAYLIST,
        payload: newPlaylist,
    };
};


export const addSongToPlaylist = (playlistId, song_Id) => {
    return {
        type: ADD_SONG,
        payload: { playlistId, song_Id },
    };
};

export const deleteSongFromPlaylist = (playlistId, songId) => {
    return {
        type: REMOVE_SONG,
        payload: { playlistId, songId },
    };
};

export const deletePlayList = (playlistId) => {
    return {
        type: REMOVE_PLAYLIST,
        payload: playlistId,
    };
};


export function editPlaylist (playlist) {
    return {
        type: EDIT_PLAYLIST,
        payload: playlist
    };
}






// export const fetchAll = () => async dispatch => {
//     const response = await fetch(`/api/playlists`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(loadAll(data.playlists));
//         return response;
//     }
// };

export const fetchUserList = () => async dispatch => {
    const response = await fetch(`/api/playlists/current`);
    if (response.ok) {
        console.log(response);

        const playlists = await response.json();
        dispatch(getUserPlaylists(playlists));
        return playlists;
    }
};

export const createNewPLaylist = (playlist) => async dispatch => {
    const { name, description } = playlist;

    const response = await fetch(`/api/playlists/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, description
        }),
    });

    if (response.ok) {
        const createNewPlaylist = await response.json();
        dispatch(createPlaylist(createNewPlaylist));
    } else {
        console.log("Failed to create new playlist");
    }
};

export const updatePlaylist = (playlist) => async dispatch => {
    const { playlistId, name, description } = playlist;

    const response = await fetch(`/api/playlists/${ playlistId }`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editPlaylist(data));
        return data;
    } else {
        const data = await response.json();
        if (data) {
            throw data.error.message;
        }
    }

};


export const removeSongFromPlaylist = (song) => async dispatch => {
    const { songId, playlist_id } = song;
    const response = await fetch(`/api/playlists/songs/${ playlist_id }/${ songId }`, {
        method: "DELETE",
    }
    );

    if (response.ok) {
        dispatch(deleteSongFromPlaylist(playlist_id, songId));
        console.log("Song successfully deleted");
    } else {
        console.log("Failed to delete song from playlist");
    }
    // const { id, playlist_id } = song;
    // try {
    //     const response = await fetch(`/api/playlists/songs/${ playlist_id }/${ id }`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ song_id: id })
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         dispatch(removeSong(song));
    //         return data;
    //     } else {
    //         const data = await response.json();
    //         if (data) {
    //             throw data.error.message;
    //         }
    //     }

    // } catch (err) {
    //     throw (err);
    // }
};

export const addSongsToPlaylist = (song) => async dispatch => {
    // const { playlistId, song_Id } = song;

    // const bodyData = {
    //     song_Id: parseInt(song_Id),
    // };

    // console.log(bodyData);

    // const response = await fetch(`/api/playlists/${ playlistId }/songs`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyData), // Convert the object to a JSON string
    // });

    // console.log(response);

    // if (response.ok) {
    //     const addSongsToPlaylist = await response.json();
    //     dispatch(addSongToPlaylist(playlistId, song_Id));
    //     return addSongsToPlaylist;
    // }
    const { playlistId, song_Id } = song;

    const formData = new FormData();
    formData.append("song_id", song_Id);


    const response = await fetch(`/api/playlists/${ playlistId }/songs`, {
        method: "POST",
        headers: {
        },
        body: formData,
    });

    if (response.ok) {
        const addSongsToPlaylist = await response.json();
        dispatch(addSongToPlaylist(playlistId, song_Id));
        return addSongsToPlaylist;
    }
};

export const deletePlaylist = (playlistId) => async dispatch => {
    const response = await fetch(`/api/playlists/${ playlistId }`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        return dispatch(deletePlayList(playlistId));
    }

};

function deepCopy (value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[ entry[ 0 ] ] = deepCopy(entry[ 1 ]);
            });
            return result;
        }
    } else {
        return value;
    }
}


const initialState = [];

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERPLAYLISTS:
            return action.payload.playlists || []; // Replace the existing state with the new playlists array.

        case ADD_PLAYLIST:
            return [ ...state, action.payload ]; // Add the new playlist to the state array.

        case ADD_SONG:
            return state.map((playlist) => {
                console.log(state);
                console.log(parseInt(playlist.id) === parseInt(action.payload.playlistId));
                if (parseInt(playlist.id) === parseInt(action.payload.playlistId)) {
                    // If the playlist matches, update its songs array with the new song.
                    return {
                        ...playlist,
                        playlist_songs: [ ...playlist.playlist_songs, action.payload.song ],
                    };
                }
                return playlist;
            });

        case EDIT_PLAYLIST:
            return state.map((playlist) => {
                return parseInt(playlist?.id) === parseInt(action.payload?.id) ? action.payload : playlist;
            });

        case REMOVE_SONG:
            return state.map((playlist) => {
                console.log(playlist);
                console.log(action.payload);
                console.log(parseInt(playlist.id) === parseInt(action.payload.playlistId));
                if (parseInt(playlist.id) === parseInt(action.payload.playlistId)) {
                    // Remove the song from the specific playlist.
                    return {
                        ...playlist,
                        playlist_songs: playlist.playlist_songs?.filter(
                            (song) => {
                                return parseInt(song?.songId) !== parseInt(action.payload?.songId);
                            }
                        ),
                    };
                }
                return playlist;
            });
        case REMOVE_PLAYLIST:
            return state.filter((playlist) => parseInt(playlist.id) !== parseInt(action.payload));

        default:
            return state;
    }
};

export default playlistReducer;
// const initialState = {};

// const playlistReducer = (state = initialState, action) => {
//     let newState = { ...state };
//     switch (action.type) {
//         case LOAD_USERPLAYLISTS:
//             action.payload.playlists?.forEach((playlist) => {
//                 newState[ playlist.id ] = playlist;
//             });
//             return newState;
//         case ADD_PLAYLIST:
//             newState[ action.payload.id ] = action.payload;
//             return newState;
//         case ADD_SONG:
//             newState[ action.payload.id ] = action.payload;
//             return newState;
//         case REMOVE_SONG:
//             delete newState[ action.payload ];
//             return newState;
//         case REMOVE_PLAYLIST:
//             delete newState[ action.payload ];
//             return newState;
//         default:
//             return state;
//     }
// };

const LOAD_ALLSONGS = 'songs/loadAll';
const LOAD_USERSONGS = 'songs/loadUserSongs';
const ADD_SONG = 'songs/addSong';
const REMOVE_SONG = 'songs/removeSong';
const UPDATE_SONG = 'song/UPDATE_SONG'
const LOAD_ONESONG = 'songs/loadOneSong'

export function loadAllSongs(songs) {
    return {
        type: LOAD_ALLSONGS,
        songs
    }
}


export function loadUserSongs(songs) {
    return {
        type: LOAD_USERSONGS,
        songs
    }
}
export const updateSong = (song) => ({
    type: UPDATE_SONG,
    song
  })

export function addSong(song) {
    return {
        type: ADD_SONG,
        song
    }
}

export function removeSong(songId) {
    return {
        type: REMOVE_SONG,
        songId
    }
}

export const fetchAllSongs = () => async dispatch => {
    const response = await fetch(`/api/songs`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllSongs(data.songs));
        return response
    }
}

export const fetchUserSongs = () => async dispatch => {
    const response = await fetch(`/api/songs/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserSongs(data.songs));
        return response;
    }
}


export const createSong = (song) => async dispatch => {
    const { name, artist_name, genre, cover_photo, file_path } = song;
    try {
        const response = await fetch(`/api/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, artist_name, genre, cover_photo, file_path})
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(addSong(data));
            return null;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error;
            } else {
                return {'error': 'An error occured. Please try again'};
            }
        }
    } catch (err) {
        throw (err);
    }
}

export const updateASong = (payload, songId) => async dispatch => {
    const response = await fetch(`/api/songs/${songId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if(response.ok) {
      const editedSong = await response.json()
      dispatch(updateSong(editedSong))
    return editedSong
    }
  }

export const deleteSong = (songId) = async dispatch => {
    const response = await fetch(`api/songs/${songId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deletionResponse = await response.json();
        dispatch(removeSong(songId)
        )
        return deletionResponse
    }
}

function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}
const songReducer = (state = {songs: {}}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALLSONGS:
            newState = deepCopy(state);
            let newSong = action.songs.reduce((data, song) => {
                data[song.id] = song;
                return data;
            }, {});
            newState.songs = newSong;
            return newState;
        case ADD_SONG:
            newState = deepCopy(state);
            newState.songs[action.song.id] = action.song;
            return newState;
        case UPDATE_SONG:
            newState = deepCopy(state)
            newState.songs[action.song.id] = action.song;
            return newState;



        default:
            return state;
    }
}
export default songReducer;

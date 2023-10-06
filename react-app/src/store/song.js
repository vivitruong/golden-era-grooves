const LOAD_ALLSONGS = 'songs/loadAll';
const LOAD_ONESONG = 'songs/loadOneSong';
const ADD_SONG = 'songs/addSong';
export function loadAllSongs (songs) {
    return {
        type: LOAD_ALLSONGS,
        songs
    };
}
export function addSong(song) {
    return {
        type: ADD_SONG,
        song
    }
}


export const fetchAllSongs = () => async dispatch => {
    const response = await fetch(`/api/songs`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllSongs(data.songs));
        return response;
    }
};

// export const fetchUserSongs = () => async dispatch => {
//     const response = await fetch(`/api/songs/current`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(loadUserSongs(data.songs));
//         return response;
//     }
// };


export const createSong = (song) => async dispatch => {
    console.log(song.cover_photo, '--coverphoto here')
    const response = await fetch(`/api/songs/`, {
        method: 'POST',
        body: song
    });

    console.log('!!!CREATE', response);
    if (response.ok) {
        const resPost = await response.json();
        dispatch(addSong(resPost));
    } else {
        console.log("There was an error making your post!");
    }


};

// export const updateASong = (payload, songId) => async dispatch => {
//     const response = await fetch(`/api/songs/${ songId }`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//         const editedSong = await response.json();
//         dispatch(updateSong(editedSong));
//         return editedSong;
//     }
// };

// export const deleteSong = ({ songId }) => async dispatch => {
//     const response = await fetch(`api/songs/${ songId }`, {
//         method: 'DELETE'
//     });
//     if (response.ok) {
//         const deletionResponse = await response.json();
//         dispatch(removeSong(songId)
//         );
//         return deletionResponse;
//     }
// };

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
// const songReducer = (state = { songs: {} }, action) => {
//     let newState;
//     switch (action.type) {
//         case LOAD_ALLSONGS:
//             const allSongs = {};
//             action?.songs?.forEach((song) => {
//                 allSongs[ song.id ] = song;
//             });
//             return {
//                 ...allSongs
//             };

// case LOAD_USERSONGS:
//     const userSong = {};
//     console.log(action);
//     action.songs?.forEach((song) => {
//         userSong[ song.id ] = song;
//     });
//     return userSong;

// case ADD_SONG:
//     newState = deepCopy(state);
//     newState.songs[ action.song.id ] = action.song;
//     return newState;
// case UPDATE_SONG:
//     newState = deepCopy(state);
//     newState.songs[ action.song.id ] = action.song;
//     return newState;



//         default:
//             return state;
//     }
// };

const initialState = [];

const songReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALLSONGS:
            return action.songs || [];
        case ADD_SONG:
            if (action.song && action.song.id) {
                return [...state, action.song];
            }
            return newState

        default:
            return state;
    }
};



export default songReducer;

export const SET_LIKES = 'likes/SET_LIKES';
export const ADD_LIKE = 'likes/ADD_LIKE';
export const DELETE_LIKE = 'likes/DELETE_LIKE';

export const likeSelector = (state) => {
    if(!state.session.user) return null;

    return state.likes[state.session.user.id]
}

export function setLikeAction(userId, songIds){
    return {
        type: SET_LIKES,
        userId,
        songIds
    }
}

export function addLikeAction (userId, songId) {
    return {
        type: ADD_LIKE,
        userId,
        songId
    }
}

export function deleteLikeAction (userId, songId) {
    return {
        type: DELETE_LIKE,
        userId,
        songId
    }
}
export const fetchLikes = () => async (dispatch, getState) => {
    const user = getState().session.user;

    if(!user) return;

    const res = await fetch('/api/likes');

    if (res.ok) {
        const data = await res.json();
        dispatch(setLikeAction(data.user_id, data.song_id))
    }
}
export const addLike = (songId) => async(dispatch, getState) => {
    const state = getState();


    if (!state.session.user) return;
    //already like it
    if (state.likes[state.session.user.id]?.includes(songId)) return;
    const res = await fetch('/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            song_id: songId
        })
    })

    if (res.ok) {
        dispatch(addLikeAction(getState().session.user.id, songId))
    }
}

export const deleteLike = (songId) => async(dispatch, getState) => {
    const state = getState();

    if(!state.session.user) return;
        //song doesnt exsit in likes
    if(!state.likes[state.session.user.id].includes(songId)) return;

    const res = await fetch(`/api/likes/${songId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteLikeAction(getState().session.user.id, songId))
    }
}

export default function likeReducer(state = {}, action) {
    const newState = {...state};
    const {songId, songIds, userId} = action;
    newState[userId] = newState[userId] || []
    switch(action.type) {
        case SET_LIKES:
            newState[userId] = songIds;
            break;
        case ADD_LIKE:
            if(newState[userId] && !newState[userId].includes(songId))
            newState[userId] = [ ...newState[userId], songId];
            break;

        case DELETE_LIKE:
            if(newState[userId] && newState[action.userId].includes(songId))
            newState[action.userId].splice(
                newState[action.userId].indexOf(songId),
                1
        );
            break;
        default:
            break;
    }
    return newState;
}

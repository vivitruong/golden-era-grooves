const GET_ALL_COMMENT = 'comment/GET_ALL_COMMENT'
const POST_COMMENT = 'comment/POST_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getAll = (comments) => ({
    type: GET_ALL_COMMENT,
    comments
})

const postComment = (comment) => ({
    type: POST_COMMENT,
    comment
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

export const getAllComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}/comments`);

    if(response.ok) {
        const comments = await response.json();
        dispatch(getAll(comments))
    }
    return response
}

export const postAComment = (id, payload) => async(dispatch) => {
    const response = await fetch(`/api/songs/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newComment = await response.json()
        dispatch(postComment(newComment))
        return newComment
    }
}


export const updateAComment = (payload, commentId) => async(dispatch) => {
    const response = await fetch(`/api/songs/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const editedComment = await response.json()
        dispatch(updateComment(editedComment))
        return editedComment
    }
}

export const deleteAComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/songs/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deletionResponse = await response.json()
        dispatch(deleteComment(commentId))
        return deletionResponse
    }

}

const initialState = {comments: {}}

const commentsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COMMENT:{
            const newState = {...state}
            const newObj = {}
            action.comments.comments.forEach(comment => {
                newObj[comment.id] = comment
              })

             newState.comments = newObj
             return newState
        }

        case POST_COMMENT: {
            const newState = { ...state}
            const newObj = {...state.comments}
            newObj[action.comment.id] = action.comment
            newState.comments = newObj
            return newState
        }

        case UPDATE_COMMENT: {
            const newState = { ...state}
            const newObj = {...state.comments}
            newObj[action.comment.id] = action.comment
            newState.comments = newObj
            return newState
        }

        case DELETE_COMMENT: {
            const newState = { ...state}
            const newObj = {...state.comments}
            delete newObj[action.commentId]
            newState.comments = newObj
            return newState
        }
    }
}

export default commentsReducer

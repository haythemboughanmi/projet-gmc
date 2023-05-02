import api from '../../api/http'
import { setAlert } from './alertAction'
import { GET_POSTS,POST_ERROR, UPDATE_LIKES,DELETE_POST,ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from '../types/type'

//get posts
export const getPosts=()=>async dispatch=>{
    try {
        const res = await api.get('/api/post')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
        console.log(res.data)
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//add likes
export const addLike=(id)=>async dispatch=>{
    try {
        const res = await api.put(`/api/post/like/${id}`)
        dispatch(getPosts())
        console.log(res.data)
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//remove likes
export const removeLike=(id)=>async dispatch=>{
    try {
        const res = await api.put(`/api/post/unlike/${id}`)
        dispatch(dispatch(getPosts())
        )
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//Delete post
export const deletePost=(id)=>async dispatch=>{
    try {
        const res = await api.delete(`/api/post/${id}`)
        dispatch(getPosts())
        dispatch(setAlert('post Removed','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//add post
export const addPost=(formData)=>async dispatch=>{
    try {
        const res = await api.post('/api/post',formData)
        dispatch({
            type:ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('post Created','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get post
export const getPost=(id)=>async dispatch=>{
    try {
        const res = await api.get(`/api/post/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
    try {
      const res = await api.post(`/posts/comment/${postId}`, formData);
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete comment
  export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
      await api.delete(`/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
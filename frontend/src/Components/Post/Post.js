import React,{useEffect,Fragment} from 'react'
import Spinner from '../layout/Spinner'
import { getPost } from '../../redux/actions/postAction'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const Post = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    const { post, loading } = useSelector((state) => state.postReducer);
    useEffect(()=>{
        dispatch(getPost(id))
    },[getPost])
    return (
    <div>Post</div>
  )
}

export default Post
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import {addLike,removeLike,deletePost, getPosts} from "../../redux/actions/postAction"
import PostComents from "./PostComents";
import Form from 'react-bootstrap/Form';


const PostItem = ({post}) => {
  console.log(post)

  const { user } = useSelector((state) => state.authReducer);
  const { profile  } = useSelector((state) => state.profileReducer);

const dispatch=useDispatch()
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img
            className="round-img"
            src={profile.image}
            alt=""
          />
          <h4>{post?.name}</h4>
        </Link>
      </div>
      <div>
        <Form.Control as="textarea" rows={8} cols={100} style={{border:'none'}} value={post?.text}/>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
        </p>
        <button onClick={()=>dispatch(addLike(post._id))&& dispatch(getPosts())} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>
            {post?.likes.length > 0 && (
              <span className="comment-count">{post?.likes.length}</span>
            )}
          </span>
        </button>
        <button  onClick={()=>dispatch(removeLike(post._id))} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          {post?.comments.length > 0 ? (
            <>
            <span className="comment-count">{post?.comments.length}</span>
            <PostComents/>
            </>
          ):null}
        </Link>
        { console.log(user._id,post.user,'aaaaa')}
         { user._id===post.user ? 
          <>
            <button  onClick={()=>dispatch(deletePost(post._id))}     
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button></>
            :null}
      </div>
    </div>
  );
};

export default PostItem;

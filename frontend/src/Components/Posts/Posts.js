import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/postAction";
import PostForm from "./PostForm";
import PostItem from "./PostItem"
const Posts = () => {
  const { posts, loading } = useSelector((state) => state.postReducer);
  console.log(posts)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);
  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i>Welcome to the community
          </p>
          
         <PostForm />
          <div className="posts">
            {posts?.map((post)=>(
                <PostItem key={post._id} post={post}/>
            ))}

          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Posts;

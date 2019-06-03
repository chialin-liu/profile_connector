import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../action/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Post = props => {
  useEffect(() => {
    props.getPost();
  }, [props.getPost]);
  const handle = e => {
    console.log("posts length" + props.post.posts.length);
    console.log("POSTs information" + JSON.stringify(props.post.posts[0]));
  };
  return (
    <Fragment>
      {props.post.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {props.post.posts.length > 0 ? (
              props.post.posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))
            ) : (
              <h2>No posts</h2>
            )}
          </div>
          {/* <button onClick={e => handle(e)}>push</button> */}
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    post: state.postCombined
  };
};
export default connect(
  mapStateToProps,
  { getPost }
)(Post);

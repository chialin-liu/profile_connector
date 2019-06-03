import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getSinglePost } from "../../action/post";

const Post = props => {
  useEffect(() => {
    props.getSinglePost(props.match.params.id);
  }, [props.getSinglePost]);

  return props.post.loading || props.post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={props.post.post} showActions={false} />
      <CommentForm postId={props.post.post._id} />
      <div className="comments">
        {props.post.post.comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={props.post.post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.postCombined
});

export default connect(
  mapStateToProps,
  { getSinglePost }
)(Post);

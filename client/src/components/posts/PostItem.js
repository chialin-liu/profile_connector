import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addLike, removeLike, deletePost } from "../../action/post";
const PostItem = props => {
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${props.post.user_id}`}>
          <img className="round-img" src={props.post.avatar} alt="" />
          <h4>{props.post.name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{props.post.text}</p>
        <p className="post-date">
          {" "}
          Posted on <Moment format="YYYY/MM/DD">{props.post.date}</Moment>
        </p>
        {props.showActions && (
          <Fragment>
            <button
              type="button"
              onClick={() => {
                console.log("Add POST ID" + props.post._id);
                props.addLike(props.post._id);
              }}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{" "}
              {props.post.likes.length > 0 && (
                <span className="comment-count">{props.post.likes.length}</span>
              )}
            </button>
            <button
              className="btn"
              onClick={() => {
                props.removeLike(props.post._id);
                console.log("Remove POST ID" + props.post._id);
              }}
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${props.post._id}`} className="btn btn-primary">
              Discussion{" "}
              {props.post.comments.length > 0 && (
                <span className="comment-count">
                  {props.post.comments.length}
                </span>
              )}
            </Link>
            {!props.auth.loading &&
              props.post.user_id === props.auth.userReducer.user._id && (
                <button
                  onClick={() => props.deletePost(props.post._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
PostItem.defaultProps = {
  showActions: true
};
const mapStateToProps = state => {
  return {
    // post: state.postCombined,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);

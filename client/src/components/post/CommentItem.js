import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../action/post";

const CommentItem = props => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${props.comment.user_id}`}>
        <img className="round-img" src={props.comment.avatar} alt="" />
        <h4>{props.comment.name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{props.comment.text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{props.comment.date}</Moment>
      </p>
      {!props.auth.loading &&
        props.comment.user_id === props.auth.userReducer.user._id && (
          <button
            onClick={() => props.deleteComment(props.postId, props.comment._id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
    </div>
  </div>
);

CommentItem.propTypes = {
  // postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);

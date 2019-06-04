import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./type";
import { setAlert } from "./alert";

export const getPost = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    console.log("Get POSTS: " + JSON.stringify(res.data));
    console.log("begin to get post from action");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
    console.log("succeed to get_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};
export const getSinglePost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    console.log("Get single POST: " + JSON.stringify(res.data));
    console.log("begin to get single post from action");
    dispatch({
      type: GET_POST,
      payload: res.data
    });
    console.log("succeed to get_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};

export const addLike = postId => async dispatch => {
  console.log("add like");
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    console.log("UPDATE POSTS: " + JSON.stringify(res.data));
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId,
        likes: res.data
      }
    });
    console.log("succeed to get_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};
export const removeLike = postId => async dispatch => {
  console.log("remove like");

  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    console.log("UPDATE POSTS: " + JSON.stringify(res.data));
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId,
        likes: res.data
      }
    });
    console.log("succeed to get_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};
export const deletePost = id => async dispatch => {
  console.log("remove Post");

  try {
    const res = await axios.delete(`/api/posts/${id}`);
    console.log("UPDATE POSTS: " + JSON.stringify(res.data));
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    dispatch(setAlert("post remove", "success"));
    console.log("succeed to get_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};
export const addPost = formData => async dispatch => {
  console.log("Add Post");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/posts", formData, config);
    console.log("CREATE POSTS: " + JSON.stringify(res.data));
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("post create", "success"));
    console.log("succeed to create_posts");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: "WRONG GET POSTS"
    });
  }
};
export const addComment = (postId, formData) => async dispatch => {
  console.log("begin to post a comment on ");
  console.log("POST ID" + postId);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log("begin to post a comment on ");
  console.log("POST ID" + postId);
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    console.log("post finished");
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "POST ERROR" }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "POST ERROR" }
    });
  }
};

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES
} from "./type";
import { setAlert } from "./alert";
import axios from "axios";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    // console.log("success to dispatch GET_PROFILE");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error getting profile",
        status: 400 //error.response.status
      }
    });
  }
};
export const getProfiles = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  try {
    console.log("begin to get all profiles");
    const res = await axios.get("/api/profile/");
    console.log("finished api get all profiles");
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
    console.log("success to dispatch GET_PROFILES");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error getting profile",
        status: 400 //error.response.status
      }
    });
  }
};
export const getProfileById = userId => async dispatch => {
  try {
    console.log("begin to get profile by user id");
    const res = await axios.get(`/api/profile/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    console.log("success to dispatch GET_PROFILE");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error getting profile",
        status: 400 //error.response.status
      }
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  try {
    console.log("Ready to post profile");
    const res = await axios.put("/api/profile/experience", formData, config);
    console.log("UPDATE PROFILE OK");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Experience added", "success"));

    history.push("/dashboard");

    console.log("dispatch create profile finished");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error creating profile",
        status: 331 //error.response.status
      }
    });
  }
};
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  try {
    console.log("Ready to post profile");
    const res = await axios.post("/api/profile", formData, config);
    console.log("POST PROFILE OK");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile update" : "Profile create", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
    console.log("dispatch create profile finished");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error creating profile",
        status: 331 //error.response.status
      }
    });
  }
};
export const addEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  try {
    console.log("Ready to post profile");
    const res = await axios.put("/api/profile/education", formData, config);
    console.log("UPDATE PROFILE OK");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education added", "success"));

    history.push("/dashboard");

    console.log("dispatch create profile finished");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error creating profile",
        status: 331 //error.response.status
      }
    });
  }
};
export const deleteExperience = id => async dispatch => {
  console.log("EXPEREINCE begin to delete");

  try {
    console.log("EXPEREINCE begin to delete");
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error creating profile",
        status: 331 //error.response.status
      }
    });
  }
};
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "error creating profile",
        status: 331 //error.response.status
      }
    });
  }
};
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure to delete?")) {
    try {
      await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: DELETE_ACCOUNT
      });
      dispatch(setAlert("profile deleted", "danger"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: "error creating profile",
          status: 331 //error.response.status
        }
      });
    }
  }
};

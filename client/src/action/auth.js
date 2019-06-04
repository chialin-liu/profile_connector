import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./type";
import setAuthToken from "../util/setAuthToken";
import axios from "axios";
// import { setAlert } from "./alert";
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    // console.log(" TOKEN in header");
    setAuthToken(localStorage.token);
  }
  try {
    // console.log("BEGINNING");
    const res = await axios.get("/api/auth");
    // console.log("RESPONSE: " + JSON.stringify(res.data));
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    // console.log("USER LOAD SUCCESS");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "Application/json"
      // Access-Control-Allow-Origin: *
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    // console.log("DISPATH FINISEH");
  } catch (error) {
    console.log(error);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   dispatch(setAlert(errors.msg, "danger"));
    // }
    // console.log("dispatch error");
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
export const login = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "Application/json"
      // Access-Control-Allow-Origin: *
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    // console.log("LOGIN end, dispatch(LOAD USER)");
    dispatch(loadUser());

    // console.log("DISPATH FINISEH");
  } catch (error) {
    console.log(error);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   dispatch(setAlert(errors.msg, "danger"));
    // }
    console.log("dispatch error");
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

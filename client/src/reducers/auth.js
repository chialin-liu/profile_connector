import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT
} from "../action/type";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: true,
  userReducer: null,
  loading: true
};
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log("HELLO");
      // console.log("action.payload.token: " + action.payload.token);
      localStorage.setItem("token", action.payload.token);
      // const token_var = localStorage.getItem("token");
      // console.log("TOKEN VARIABLE: " + JSON.parse(token_var));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case DELETE_ACCOUNT:
      // console.log("REGISTER ERROR");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userReducer: null // new add
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userReducer: action.payload
      };

    default:
      return state;
  }
};

import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // console.log("setAuthToken succeed");
    axios.defaults.headers.common["token-header"] = token;
    // console.log("setAuthToken succeed finally");
  } else {
    delete axios.defaults.headers.common["token-header"];
  }
};
export default setAuthToken;

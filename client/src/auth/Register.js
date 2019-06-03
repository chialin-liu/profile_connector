import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../action/alert";
import { register } from "../action/auth";
// import axios from "axios";
import PropTypes from "prop-types";
// import axios from "axios";
const Register = props => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const handleChange = event => {
    // console.log("change");
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    console.log("Submitting...");
    event.preventDefault();
    if (password !== password2) {
      props.setAlert("ERROR PASSWORD", "danger");
    } else {
      props.register({ name, email, password });
      // try {
      //   const newUser = {
      //     name: name,
      //     email: email,
      //     password: password
      //   };
      //   const config = {
      //     headers: {
      //       "Content-type": "Application/json"
      //       // Access-Control-Allow-Origin: *
      //     }
      //   };
      //   const body = JSON.stringify(newUser);
      //   // const res = await axios.post(
      //   //   "http://localhost:3800/api/users",
      //   //   body,
      //   //   // newUser,
      //   //   config
      //   // );
      //   // console.log(res.data.token);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user-circle" />
        Create your account
      </p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => {
              handleChange(e);
            }}
          />
          <small className="form-text">Use Gravatar email account</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmed Password"
            name="password2"
            value={password2}
            onChange={e => {
              handleChange(e);
            }}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary"
          // onSubmit={event => onsubmit(event)}
          // onClick={this.const }
        />
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired, //PTFR
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);

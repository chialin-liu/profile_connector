import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../action/auth";
import PropTypes from "prop-types";
// import axios from "axios";
const Login = props => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = formData;
  const handleChange = event => {
    // console.log("change");
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    // console.log("SUBMIT info@ Login...");
    event.preventDefault();
    props.login({ name, email, password });
    // console.log("LOGIN SUCCESS");
  };
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user-circle" />
        Sign into your account
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

        <input
          type="submit"
          value="Login"
          className="btn btn-primary"
          // onSubmit={event => onsubmit(event)}
          // onClick={this.const }
        />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(
  mapStateToProps,
  { login }
)(Login);

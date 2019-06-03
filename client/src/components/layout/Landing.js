import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Landing = props => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Profile</h1>
          <p className="lead">
            Create your own profile, share your own posts/ideas
          </p>
          <div className="button">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(Landing);

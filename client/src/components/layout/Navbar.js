import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";
const Navbar = props => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="high-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={props.logout} to="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="high-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-user-edit"> </i>
          Devconnector
        </Link>
      </h1>
      {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);

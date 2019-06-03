import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../action/profile";
const Dashboard = props => {
  useEffect(() => {
    props.getCurrentProfile();
  }, [getCurrentProfile]);
  // if (props.auth.userReducer) {
  //   console.log("USER NAME:" + props.auth.userReducer.user.name);
  // }
  // console.log("props" + JSON.stringify(props));

  // && props.profile.profileReducer === null  => Weird part

  return props.profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        {props.auth.userReducer && props.auth.userReducer.user.name}
      </p>
      {props.profile.profileReducer !== null ? (
        // console.log("props.profile.profileReducer: "+JSON.stringify(props.profile.profileReducer)
        <Fragment>
          <DashboardAction />
          <Experience
            experience={
              props.profile.profileReducer &&
              props.profile.profileReducer.experience
            }
          />
          <Education
            education={
              props.profile.profileReducer &&
              props.profile.profileReducer.education
            }
          />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => props.deleteAccount()}
            >
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You do not have a profile, go and set it</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../action/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = props => {
  useEffect(() => {
    props.getProfileById(props.match.params.id);
  }, [props.getProfileById]);
  return (
    <Fragment>
      {props.profile.profileReducer === null || props.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Developers
          </Link>
          {props.auth.isAuthenticated &&
            props.auth.loading === false &&
            props.auth.userReducer.user._id ===
              props.profile.profileReducer.user_id._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={props.profile.profileReducer} />
            <ProfileAbout profile={props.profile.profileReducer} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {props.profile.profileReducer.experience.length > 0 ? (
                <Fragment>
                  {props.profile.profileReducer.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {props.profile.profileReducer.education.length > 0 ? (
                <Fragment>
                  {props.profile.profileReducer.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);

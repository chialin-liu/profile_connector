import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../action/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
const Profiles = props => {
  useEffect(() => {
    props.getProfiles();
  }, [props.getProfile]);
  // const countProfiles = e => {
  //   console.log("profiles count: " + props.profile.profiles.length);

  //   console.log("EACH PROFILES: " + JSON.stringify(props.profile.profiles));
  // };
  return (
    <Fragment>
      {props.profile.loading || props.profile.profiles === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {props.profile.profiles.length > 0 ? (
              props.profile.profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Fragment>
                <h1>No profiles found...</h1>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined
  };
};
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);

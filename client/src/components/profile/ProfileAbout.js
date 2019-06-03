import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = props => {
  return (
    <div className="profile-about bg-light p-2">
      {props.profile.bio && (
        <Fragment>
          <h2 className="text-primary">{props.profile.user_id.name}'s Bio</h2>
          <p>{props.profile.bio}</p>
        </Fragment>
      )}

      <div className="line" />
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {props.profile.skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;

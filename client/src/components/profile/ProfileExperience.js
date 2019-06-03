import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileExperience = props => {
  return (
    <div>
      <h3 className="text-dark">{props.experience.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{props.experience.from}</Moment> -{" "}
        {!props.experience.to ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{props.experience.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong> {props.experience.title}
      </p>
      <p>
        <strong>Description: </strong> {props.experience.description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {};

export default ProfileExperience;

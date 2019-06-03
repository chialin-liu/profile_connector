import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileEducation = props => {
  return (
    <div>
      <h3 className="text-dark">{props.education.school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{props.education.from}</Moment> -{" "}
        {!props.education.to ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{props.education.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong> {props.education.degree}
      </p>
      <p>
        <strong>Field of Study: </strong> {props.education.fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong> {props.education.description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {};

export default ProfileEducation;

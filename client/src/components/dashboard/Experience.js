import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteExperience } from "../../action/profile";
import { connect } from "react-redux";
const Experience = props => {
  // console.log("EXPERIENCE: " + JSON.stringify(props));

  const experiences = props.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => {
            props.deleteExperience(exp._id);
            console.log("experience ID: " + exp._id);
            console.log("experience begin to delete");
          }}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);

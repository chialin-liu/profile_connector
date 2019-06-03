import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../../action/profile";
const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [toDateDisable, toggleDisable] = useState(false);
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData;
  const onchange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("update education...");
    console.log("FORMDATA: " + JSON.stringify(formData));
    props.addEducation(formData, props.history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldOfStudy"
            value={fieldOfStudy}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDateDisable);
              }}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onchange(e)}
            disabled={toDateDisable ? "disabled" : ""}
          />
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined
  };
};
export default connect(
  mapStateToProps,
  { addEducation }
)(AddEducation);

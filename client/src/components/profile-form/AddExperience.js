import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from "../../action/profile";
const AddExperience = props => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [toDateDisable, toggleDisable] = useState(false);
  const { title, company, location, from, to, current, description } = formData;
  const onchange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("update experience...");
    console.log("FORMDATA: " + JSON.stringify(formData));
    props.addExperience(formData, props.history);
    console.log(
      "AFTER updating experience: " +
        JSON.stringify(props.profile.profileReducer.experience)
    );
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            // required
            value={title}
            onChange={e => {
              onchange(e);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            // required
            value={company}
            onChange={e => {
              onchange(e);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => {
              onchange(e);
            }}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => {
              onchange(e);
            }}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDateDisable);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => {
              onchange(e);
            }}
            disabled={toDateDisable ? "disabled" : ""}
          />
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => {
              onchange(e);
            }}
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined
  };
};
export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience);

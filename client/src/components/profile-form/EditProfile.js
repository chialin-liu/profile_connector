import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../action/profile";
import { Link, withRouter } from "react-router-dom";
const EditProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    facebook: "",
    linkedin: "",
    instagram: ""
  });
  const [displaySocialInput, setDisplaySocialInput] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    facebook,
    linkedin,
    instagram
  } = formData;
  useEffect(() => {
    props.getCurrentProfile();
    console.log("PROPS:" + JSON.stringify(props));
    setFormData({
      company:
        props.profile.loading || !props.profile.profileReducer.company
          ? ""
          : props.profile.profileReducer.company,
      website:
        props.profile.loading || !props.profile.profileReducer.website
          ? ""
          : props.profile.profileReducer.website,
      location:
        props.profile.loading || !props.profile.profileReducer.location
          ? ""
          : props.profile.profileReducer.location,
      status:
        props.profile.loading || !props.profile.profileReducer.status
          ? ""
          : props.profile.profileReducer.status,
      skills:
        props.profile.loading || !props.profile.profileReducer.skills
          ? ""
          : props.profile.profileReducer.skills.join(","),

      bio:
        props.profile.loading || !props.profile.profileReducer.bio
          ? ""
          : props.profile.profileReducer.bio,
      facebook:
        props.profile.loading || !props.profile.profileReducer.social
          ? ""
          : props.profile.profileReducer.social.facebook,
      linkedin:
        props.profile.loading || !props.profile.profileReducer.social
          ? ""
          : props.profile.profileReducer.social.linkedin,
      instagram:
        props.profile.loading || !props.profile.profileReducer.social
          ? ""
          : props.profile.profileReducer.social.instagram
    });
  }, [props.profile.loading, props.getCurrentProfile]);
  const onchange = event => {
    // console.log("change");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("submit profile...");
    console.log("FORMDATA: " + JSON.stringify(formData));
    props.createProfile(formData, props.history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* required fields</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onchange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onchange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onchange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onchange(e)}
          />
          <small className="form-text">City & Country suggested</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onchange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onchange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light "
            onClick={() => setDisplaySocialInput(!displaySocialInput)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInput && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onchange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onchange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onchange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profileCombined
  };
};
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));

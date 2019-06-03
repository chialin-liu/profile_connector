import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ProfileTop = props => {
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={props.profile.user_id.avatar}
          alt=""
        />

        <h1 className="large">{props.profile.user_id.name}</h1>
        <p className="lead">
          {props.profile.status}{" "}
          {props.profile.company && <span> at {props.profile.company}</span>}
        </p>
        <p>{props.profile.location && <span>{props.profile.location}</span>}</p>
        <div className="icons my-1">
          {props.profile.social && props.profile.social.facebook && (
            <a href={props.profile.social.facebook}>
              <i className="fab fa-facebook fa-2x" />
            </a>
          )}
          {props.profile.social && props.profile.social.linkedin && (
            <a href={props.profile.social.linkedin}>
              <i className="fab fa-linkedin fa-2x" />
            </a>
          )}
          {props.profile.social && props.profile.social.instagram && (
            <a href={props.profile.social.instagram}>
              <i className="fab fa-instagram fa-2x" />
            </a>
          )}
        </div>
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {};

export default ProfileTop;

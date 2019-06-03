import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ProfileItem = props => {
  console.log("PROPS from ProfileItem:" + JSON.stringify(props));
  return (
    <div className="profile bg-light">
      <img src={props.profile.user_id.avatar} alt="" className="round-img" />
      <div>
        <h2>{props.profile.user_id.name}</h2>
        <p>
          {props.profile.status}{" "}
          {props.profile.company && <span> at {props.profile.company}</span>}
        </p>
        <p className="my-1">
          {props.profile.location && <span>{props.profile.location}</span>}
        </p>
        <Link
          to={`/profile/${props.profile.user_id._id}`}
          className="btn btn-primary"
        >
          View Profile
        </Link>
      </div>
      <ul>
        {props.profile.skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

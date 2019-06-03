import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Alert = props => {
  if ((props.alert !== null) & (props.alert.length > 0)) {
    return props.alert.map(alert => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });
  } else {
    return <div />;
  }
};

Alert.propTypes = {
  alert: PropTypes.array.isRequired //PTAR
};
// const mapStateToProps = state => {
//   return { alert: state.alert };
// };
const mapStateToProps = state => ({
  alert: state.alert
});
export default connect(mapStateToProps)(Alert);

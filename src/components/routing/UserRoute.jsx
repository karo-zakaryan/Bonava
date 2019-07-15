import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const UserRoute = ({ component: Component, activeRequisition, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.bonavaToken ? (
        <Redirect to="/login" />
      ) : Object.keys(activeRequisition).length ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/apartments" />
      )
    }
  />
);

const mapStateToProps = ({ type }) => ({
  activeRequisition: type.currentRequisition
});

export default connect(mapStateToProps)(UserRoute);

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({
  redirectURL,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.bonavaToken ? (
        <Redirect to={redirectURL} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AuthRoute);

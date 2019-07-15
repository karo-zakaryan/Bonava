import React from "react";
import { paths } from "../../constants/paths";

import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";

// Containers
import AdminPage from "../container/AdminPage/AdminPage";
import UserPage from "../container/UserPage/UserPage";
import Settings from "../container/Settings/Settings";

// Auths
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Recovery from "../auth/Recovery/Recovery";
import PasswordRecovery from "../auth/PasswordRecovery/PasswordRecovery";
import UserRoute from "./UserRoute";

const Routes = () => {
  const { user, admin } = paths;

  return (
    <Switch>
      <AuthRoute exact path="/login" redirectURL={admin} component={Login} />
      <AuthRoute
        exact
        path="/register"
        redirectURL={admin}
        component={Register}
      />
      <AuthRoute
        exact
        path="/password-recovery"
        redirectURL={admin}
        component={PasswordRecovery}
      />
      <AuthRoute
        exact
        path="/recovery"
        redirectURL={admin}
        component={Recovery}
      />

      <PrivateRoute exact path="/settings" component={Settings} />
      <UserRoute path={user} component={UserPage} />
      <PrivateRoute path={admin} component={AdminPage} />

      {/* <Route component={NotFound} /> */}
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default Routes;

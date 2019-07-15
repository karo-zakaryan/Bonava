import React, { useEffect } from "react";
import API, { setAuthToken } from "./api";
import Axios from "axios";
import { Container } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

// Custom hooks
import { useBonavaApi } from "./customHooks/useBonavaApi";

// Redux
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./store/actions/auth/auth";
import setStyles from "./store/actions/setStyles/setStyles";
import editTreePack from "./store/actions/editTreePack/editTreePack";
import setForgeToken from "./store/actions/setForgeToken/setForgeToken";
import { Snackbar } from "react-redux-snackbar";

// Routing
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routing/Routes";

// Presentational
import Header from "./components/presentational/Header/Header";

if (localStorage.bonavaToken) {
  setAuthToken(localStorage.bonavaToken);
}

const App = () => {
  const { getState, dispatch } = store;
  const { auth, tree } = getState();
  const { packages, projectResponse: projects } = tree;
  const { isAuthenticated } = auth;

  useEffect(
    () => {
      localStorage.bonavaToken && dispatch(loadUser());
    },
    [dispatch]
  );

  useEffect(
    () => {
      if (
        localStorage.bonavaToken &&
        packages.data.length &&
        packages.links &&
        packages.links.next
      ) {
        getPackagesHandler(packages.links.next);
        getStyledHandler();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, packages]
  );

  const [{ response }] = useBonavaApi("get", "packages");

  const [{ response: forgeData, isLoading: fgLoad }] = useBonavaApi(
    "get",
    "forge_token"
  );

  const getPackagesHandler = url => {
    try {
      setTimeout(async () => {
        const { data } = await Axios.get(url);

        dispatch(editTreePack(data));
        getStyledHandler(data.data);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const getStyledHandler = arr => {
    try {
      if (arr) {
        arr.map(async pkg => {
          // if (pkg.id !== 0 && pkg.id > 20) {
          const { data } = await API.get(`styles?package=${pkg.id}`);

          if (data.data.length) {
            dispatch(
              setStyles(data.data, data, data.package_id, pkg.project_id)
            );
          }
          // }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!fgLoad) {
    dispatch(setForgeToken(forgeData));
  }

  if (
    // !isLoading &&
    response.data.length &&
    !packages.data.length &&
    projects.data.length
  ) {
    dispatch(editTreePack(response));
    getStyledHandler(response.data);
  }

  return (
    <Provider store={store}>
      <Router>
        <PerfectScrollbar>
          <Container fluid>
            <Header />
            <Routes />
          </Container>
          <Snackbar
            theming={{
              backgroundColor: "#013B2D",
              buttonColor: "#69C4B0"
            }}
          />
        </PerfectScrollbar>
      </Router>
    </Provider>
  );
};

export default App;

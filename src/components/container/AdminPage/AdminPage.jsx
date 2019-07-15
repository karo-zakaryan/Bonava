import React, { useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { paths } from "../../../constants/paths";
import { Route, Switch, Redirect } from "react-router-dom";
import { useBonavaApi } from "../../../customHooks/useBonavaApi";
import getProject from "../../../store/actions/getProject/getProject";

import { Container } from "react-bootstrap";
import AdminData from "../AdminData/AdminData";
import AdminProjects from "../AdminProjects/AdminProjects";
import UserRequistion from "../UserRequistion/UserRequistion";

const AdminPage = ({ getProject, projects }) => {
  const [{ response, isLoading }] = useBonavaApi("get", "projects");

  const getProjectsHandler = async url => {
    try {
      const { data } = await Axios.get(url);

      data.data.forEach(project => {
        getProject(project);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () => {
      if (projects.data.length && projects.links.next) {
        getProjectsHandler(projects.links.next);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects]
  );

  if (!isLoading && response.data.length && !projects.data.length) {
    response.data.forEach(project => {
      getProject(project, response);
    });
  }

  return (
    <Container fluid>
      <Switch>
        <Route exact path={paths.apartments} component={AdminProjects} />
        <Route exact path={paths.userRequisition} component={UserRequistion} />
        <Route exact path={paths.adminData} component={AdminData} />
        <Redirect from={paths.admin} to={paths.apartments} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = ({ tree }) => ({
  projects: tree.projectResponse
});

export default connect(
  mapStateToProps,
  { getProject }
)(AdminPage);

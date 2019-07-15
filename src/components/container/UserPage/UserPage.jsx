import React, { useEffect } from "react";
import API from "../../../api";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { paths } from "../../../constants/paths";
import { Route, Switch, Redirect } from "react-router-dom";
import setStyles from "../../../store/actions/setStyles/setStyles";
import editTreePack from "../../../store/actions/editTreePack/editTreePack";
import getProject from "../../../store/actions/getProject/getProject";
import getData from "../../../store/actions/getData/getData";
import { useBonavaApi } from "../../../customHooks/useBonavaApi";

import UserStyles from "../UserStyles/UserStyles";
import UserOther from "../UserOther/UserOther";
import UserPackages from "../UserPackages/UserPackages";
import UserElements from "../UserElements/UserElements";
import UserSidebar from "../UserSidebar/UserSidebar";

const UserPage = ({ setStyles, editTreePack, packages,projects, getProject, getData }) => {
  const [{ response }] = useBonavaApi("get", "packages");
  const [{ response: projectResponse, isLoading }] = useBonavaApi("get", "projects");
  const [{ response: attrResponse }] = useBonavaApi("get", "/attributes");

  const downloadItems = isEff => {
    attrResponse.data.map(async (item, index, arr) => {
      const isSameType =
          index + 1 < arr.length ? arr[index + 1].type !== item.type : true;
      if (item.type !== "20" && isSameType) {
        const { data } = await axios.get(
            `http://bonava.kilonewton.ru/api/attributes?type=${item.type}`
        );
        const doors = item.type === "Дверь" && data.data;
        const walls = item.type === "Плитка стен ванной и туалета" && data.data;
        const laminates = item.type === "Паркет" && data.data;
        if (doors) {
          const updD = doors.map(door => ({
            ...door,
            isCheck: false,
            isChRbtn: false
          }));
          isEff && getData("doors", updD);
        }
        if (walls) {
          const updW = walls.map(wall => ({
            ...wall,
            isCheck: false,
            isChRbtn: false
          }));

          isEff && getData("walls", updW);
        }
        if (laminates) {
          const updL = laminates.map(laminate => ({
            ...laminate,
            isCheck: false,
            isChRbtn: false
          }));

          isEff && getData("laminates", updL);
        }
      }
    });
  };

  const getProjectsHandler = async url => {
    try {
      const { data } = await axios.get(url);

      data.data.forEach(project => {
        getProject(project);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (attrResponse.data.length) {
      downloadItems(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrResponse]);

  useEffect(() => {
    if (projects.data.length && projects.links.next) {
      getProjectsHandler(projects.links.next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  if (!isLoading && projectResponse.data.length && !projects.data.length) {
    projectResponse.data.forEach(project => {
      getProject(project, projectResponse);
    });
  }

  const getStyledHandler = arr => {
    try {
      if (arr) {
        arr.map(async pkg => {
          const { data } = await API.get(`styles?package=${pkg.id}`);

          if (data.data.length) {
            setStyles(data.data, data, data.package_id, pkg.project_id);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (response.data.length && !packages.data.length) {
    editTreePack(response);
    getStyledHandler(response.data);
  }

  return (
    <Container fluid>
      <Row className="user-pg">
        <UserSidebar />
        <Switch>
          <Route exact path={paths.userPackages} component={UserPackages} />
          <Route exact path={paths.userStyles} component={UserStyles} />
          <Route exact path={paths.userElements} component={UserElements} />
          <Route exact path={paths.userOther} component={UserOther} />

          <Redirect from={paths.user} to={paths.userPackages} />
        </Switch>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ tree }) => ({
  packages: tree.packages,
  projects: tree.projectResponse
});

export default connect(
  mapStateToProps,
  { setStyles, editTreePack, getProject, getData }
)(UserPage);

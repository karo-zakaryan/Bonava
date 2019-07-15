import React, { useEffect } from "react";
import Axios from "axios";
import API from "../../../api";
import { connect } from "react-redux";
import { useBonavaApi } from "../../../customHooks/useBonavaApi";
import getProject from "../../../store/actions/getProject/getProject";

import {
  Col,
  Tab,
  Nav,
  ButtonToolbar,
  Button,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";

import MagneticTree from "../../presentational/MagneticTree/MagneticTree";

import "./Sidebar.css";

const Sidebar = ({ getProject, treeData, projects, data }) => {
  const [{ response, isLoading }] = useBonavaApi("get", "projects");
  const { tiles, doors, showers, laminates, walls } = data;

  const disabled = !doors.length && !walls.length && !laminates.length;

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

  useEffect(() => {
    if (projects.data.length && projects.links.next) {
      getProjectsHandler(projects.links.next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  if (!isLoading && response.data.length && !projects.data.length) {
    response.data.forEach(project => {
      getProject(project, response);
    });
  }

  const selectHandler = selectedKey => {
    console.log(selectedKey);
  };

  const addProjectHandler = async () => {
    const elements = [...doors, ...showers, ...laminates, ...walls, ...tiles];
    const elInts = elements.map(el => el.id);

    const { data } = await API.post("projects", {
      name: "Объект 1",
      // investment_id: 11,
      attributes: elInts
    });

    getProject(data.data);
  };

  return (
    <Col xs={12} xl={3} className="sidebar">
      <Col className="tab-col">
        <Tab.Container defaultActiveKey="first">
          <h4>Сортировка</h4>

          <Nav variant="pills" className="flex-nowrap" onSelect={selectHandler}>
            <Nav.Item className="tab-item">
              <Nav.Link eventKey="first">Элементы->Помещения</Nav.Link>
            </Nav.Item>
            <Nav.Item className="tab-item">
              <Nav.Link eventKey="second">Помещения->Элементы</Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
        <ButtonToolbar className="button-toolbar">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-project">Добавить проект</Tooltip>}
          >
            <Button
              variant="primary"
              onClick={addProjectHandler}
              disabled={disabled}
            >
              <MdLibraryAdd />
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      </Col>
      <Col>
        {treeData.map(data => (
          <MagneticTree key={data.id} data={data} />
        ))}
      </Col>
    </Col>
  );
};

const mapStateToProps = ({ ridata, tree }) => ({
  treeData: tree.treeData,
  data: ridata.data,
  projects: tree.projectResponse
});

export default connect(
  mapStateToProps,
  { getProject }
)(Sidebar);

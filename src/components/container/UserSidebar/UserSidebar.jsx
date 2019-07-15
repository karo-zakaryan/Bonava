import React from "react";
import { withRouter } from "react-router-dom";

import { Col, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { paths } from "../../../constants/paths";
// import { useBonavaApi } from "../../../customHooks/useBonavaApi";
import "./UserSidebar.css";

const UserSidebar = ({ history }) => {
  // const [{ response, isLoading }] = useBonavaApi("get", "packages");
  const { location } = history;

  return (
    <Col xs={12} xl={3} className="sidebar sd-user">
      <Nav defaultActiveKey={paths.userPackages}>
        <Nav activeKey={location.pathname} className="flex-column">
          <LinkContainer to={paths.userPackages}>
            <NavItem className="ni-user">
              <Nav.Link href={paths.userPackages}>
                <span>Пакет</span>
              </Nav.Link>
            </NavItem>
          </LinkContainer>

          <LinkContainer to={paths.userStyles}>
            <NavItem className="ni-user">
              <Nav.Link href={paths.userStyles}>
                <span>Стиль</span>
              </Nav.Link>
            </NavItem>
          </LinkContainer>

          <LinkContainer to={paths.userElements}>
            <NavItem className="ni-user">
              <Nav.Link href={paths.userElements}>
                <span>Элементы</span>
              </Nav.Link>
            </NavItem>
          </LinkContainer>

          <LinkContainer to={paths.userOther}>
            <NavItem className="ni-user">
              <Nav.Link href={paths.userOther}>
                <span>Итого: </span>
              </Nav.Link>
            </NavItem>
          </LinkContainer>
        </Nav>
      </Nav>
    </Col>
  );
};

export default withRouter(UserSidebar);

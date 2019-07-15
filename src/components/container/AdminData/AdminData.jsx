import React from "react";
import { Row, Container } from "react-bootstrap";

import Sidebar from "../Sidebar/Sidebar";
import RightPart from "../RightPart/RightPart";
import "./AdminData.css";

const AdminData = () => {
  return (
    <Container fluid>
      <Row className="cont">
        <Sidebar />
        <RightPart />
      </Row>
    </Container>
  );
};

export default AdminData;

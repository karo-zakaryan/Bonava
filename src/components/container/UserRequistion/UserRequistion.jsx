import React from "react";
import { connect } from "react-redux";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { Container, Form, Spinner } from "react-bootstrap";
import RequistionCard from "../../presentational/RequistionCard/RequistionCard";

import "./UserRequistion.css";
import { withRouter } from "react-router-dom";

const UserRequistion = ({ projects, history }) => {
  return (
    <Container fluid>
      <div className="Projects_full_page">
        <div className="top_part_reqs">
          <Form>
            <Form.Group controlId="formBasicEmail" className="f-group">
              <div className="search-container">
                <FaSearch color="#97A4AB" className="search-icon" />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
              </div>
            </Form.Group>
          </Form>
          <FaRegTrashAlt size={20} color="#97A4AB" className="trash_icon" />
        </div>
        {projects.length ? (
          projects.map(project => {
            return (
              <RequistionCard
                key={project.id}
                nextClick={() => history.push("/admin/apartments")}
                name="Иванов Сергей Георгиевич"
                email="ivanov@gmail.com"
                phone="+7(921) 398 63 52"
                packageName="Plus"
                styleName="Scandi"
                date="03.07.2019"
                title={project.name}
                area={81.36}
                rooms={3}
                price="11 131 924"
                salePrice="10 352 689"
                floor={1}
                availableFacing="Белая, полная"
              />
            );
          })
        ) : (
          <Spinner animation="border" variant="success" />
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = ({ tree }) => ({
  projects: tree.projectResponse.data
});

export default connect(mapStateToProps)(withRouter(UserRequistion));

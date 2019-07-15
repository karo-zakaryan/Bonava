import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import API from "../../../api";

import { Container, Spinner } from "react-bootstrap";
import ProjectCard from "../../presentational/ProjectCard/ProjectCard";

import "./AdminProjects.css";

const AdminProjects = ({ projects }) => {
  const [units, setUnits] = useState({ data: [] });
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getUnits = async () => {
      try {
        setIsLoad(true);
        const { data } = await API.get("units");
        setUnits(data);
        setIsLoad(false);
      } catch (err) {
        console.error(err);
      }
    };

    getUnits();
  }, []);

  return (
    <Container fluid>
      <div className="Projects_full_page">
        {units.data.length && !isLoad ? (
          units.data.map(unit => {
            return (
              <ProjectCard
                key={unit.id}
                unit={unit}
                title={unit.bona_lvu_name}
                area={unit.area}
                rooms={unit.name}
                price={unit.price}
                salePrice={unit.discount_price}
                floor={unit.flor}
                availableFacing="Белая, полная"
              />
            );
          })
        ) : isLoad ? (
          <Spinner animation="border" variant="success" />
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = ({ tree }) => ({
  projects: tree.projectResponse.data
});

export default connect(mapStateToProps)(AdminProjects);

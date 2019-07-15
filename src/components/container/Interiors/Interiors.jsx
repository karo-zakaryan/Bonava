import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import ContentEditable from "react-contenteditable";
import Interior from "../../presentational/Interior/Interior";

import "./Interiors.css";

const Interiors = ({ doors, md, checkHandler, checkable, checkDisable, isSt }) => {
  const mainRef = useRef(null);
  const childRef = useRef(null);
  const [doorItmes, setdoorItmes] = useState([]);
  const [mainP, setMainP] = useState("Межкомнатные двери");
  const [childP, setChildP] = useState("Покрытие экошпон, фурнитура хром");
  const rbtn = isSt;
  // const rbtn = !checkable && isChildstyle && doors.length !== 1;

  useEffect(() => {
    setdoorItmes(doors);
  }, [doors]);

  const interiorList = doorItmes.map((door, index) => (
    <Interior
      {...door}
      checkDisable={checkDisable}
      inpName="doors"
      key={index}
      rbtn={rbtn}
      checkable={checkable}
      checkHandler={checkHandler}
    />
  ));

  return doorItmes.length ? (
    <Col sm={12} md={md} className="top-item col-10">
      <div className="Interior-header">
        <ContentEditable
          tagName="p"
          html={mainP}
          disabled={false}
          className="main-p"
          innerRef={mainRef}
          onChange={({ target }) => setMainP(target.value)}
        />
        <ContentEditable
          tagName="p"
          html={childP}
          disabled={false}
          className="child-p"
          innerRef={childRef}
          onChange={({ target }) => setChildP(target.value)}
        />
      </div>
      <Sortable
        className="Interior-content"
        onChange={(order, sortable, evt) => {
          const arr = order.map(ord => doors.find(el => el.id === +ord));

          setdoorItmes(arr);
        }}
      >
        {interiorList}
      </Sortable>
    </Col>
  ) : null;
};

const mapStateToProps = ({ type }) => ({
  isSt: type.isSt
});

export default connect(mapStateToProps)(Interiors);

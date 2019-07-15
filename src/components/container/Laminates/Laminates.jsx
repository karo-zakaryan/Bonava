import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import ContentEditable from "react-contenteditable";
import Laminate from "../../presentational/Laminate/Laminate";

import "./Laminates.css";

const Laminates = ({
  laminates,
  md,
  checkHandler,
  checkable,
  checkDisable,
  isSt
}) => {
  const mainRef = useRef(null);
  const childRef = useRef(null);
  const [laminItems, setlaminItems] = useState([]);
  const [mainP, setMainP] = useState("Ламинат + плитка на балкон");
  const [childP, setChildP] = useState(
    "Ламинат - Tarkett Синтерос Dubart 32 класс"
  );
  const rbtn = isSt;

  useEffect(() => {
    setlaminItems(laminates);
  }, [laminates]);

  const laminateList = laminItems.map((laminate, index) => (
    <Laminate
      {...laminate}
      key={index}
      checkDisable={checkDisable}
      rbtn={rbtn}
      inpName="laminates"
      checkable={checkable}
      checkHandler={checkHandler}
    />
  ));

  return laminItems.length ? (
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
        className="Laminate-content"
        onChange={(order, sortable, evt) => {
          const arr = order.map(ord => laminates.find(el => el.id === +ord));

          setlaminItems(arr);
        }}
      >
        {laminateList}
      </Sortable>
    </Col>
  ) : null;
};

const mapStateToProps = ({ type }) => ({
  isSt: type.isSt
});

export default connect(mapStateToProps)(Laminates);

import React, { useState, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import ContentEditable from "react-contenteditable";
import Shower from "../../presentational/Shower/Shower";

import "./Showers.css";

const Showers = ({ showers, md, checkHandler, checkable, isChildstyle }) => {
  const mainRef = useRef(null);
  const childRef = useRef(null);
  const [showerItems, setshowerItems] = useState([]);
  const [mainP, setMainP] = useState("Ванна или душевое ограждение");
  const [childP, setChildP] = useState("если предусмотреню проектом");
  const rbtn = !checkable && isChildstyle && showers.length !== 1;

  useEffect(() => {
    setshowerItems(showers);
  }, [showers]);

  const showersList = showerItems.map((shower, index) => (
    <Shower
      {...shower}
      key={index}
      rbtn={rbtn}
      inpName="showers"
      checkable={checkable}
      checkHandler={checkHandler}
    />
  ));

  return showerItems.length ? (
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
        className="Shower-content"
        onChange={(order, sortable, evt) => {
          const arr = order.map(ord => showers.find(el => el.id === +ord));

          setshowerItems(arr);
        }}
      >
        {showersList}
      </Sortable>
    </Col>
  ) : null;
};

export default Showers;

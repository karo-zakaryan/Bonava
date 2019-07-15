import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import ContentEditable from "react-contenteditable";
import WallColor from "../../presentational/WallColor/WallColor";

import "./WallColors.css";

const WallColors = ({ md, walls, checkHandler, checkable,checkDisable, isSt }) => {
  const mainRef = useRef(null);
  const childRef = useRef(null);
  const [wallItmes, setwallItmes] = useState([]);
  const [mainP, setMainP] = useState("Цвет стен");
  const [childP, setChildP] = useState(
    "Краска вододисперсионная, колеровка по Tikkurila Opus II"
  );
  const rbtn = isSt;

  useEffect(() => {
    setwallItmes(walls);
  }, [walls]);

  const wallList = wallItmes.map((wall, i) => (
    <WallColor
      key={i}
      checkDisable
      rbtn={rbtn}
      inpName="walls"
      checkHandler={checkHandler}
      checkable={checkable}
      {...wall}
    />
  ));

  return wallItmes.length ? (
    <Col sm={12} md={md} className="top-item col-10">
      <div className="Wall-header">
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
        className="Wall-items"
        onChange={(order, sortable, evt) => {
          const arr = order.map(ord => walls.find(el => el.id === +ord));

          setwallItmes(arr);
        }}
      >
        {wallList}
      </Sortable>
    </Col>
  ) : null;
};

const mapStateToProps = ({ type }) => ({
  isSt: type.isSt
});

export default connect(mapStateToProps)(WallColors);

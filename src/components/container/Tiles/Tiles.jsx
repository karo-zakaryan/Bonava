import React, { useState, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import ContentEditable from "react-contenteditable";
import Tile from "../../presentational/Tile/Tile";

import "./Tiles.css";

const Tiles = ({ tiles, md, checkHandler, checkable, isChildstyle }) => {
  const mainRef = useRef(null);
  const childRef = useRef(null);
  const sChildRef = useRef(null);
  const [tileItmes, settileItmes] = useState([]);
  const [mainP, setMainP] = useState("Плитка для ванной и туалета");
  const [sChildP, setSChildP] = useState(
    " В ванной комнате и санузле акцетной всегда будет стена напротив входа,в туалете - всегда стена на которой располагается раковина"
  );
  const [childP, setChildP] = useState(
    "Стены: Kerama Marazzi Калейдоскоп 20x20 см, затирка Kiilto 10, Пол:Kerama Marazzi Караоке"
  );
  const rbtn = !checkable && isChildstyle && tiles.length !== 1;

  useEffect(() => {
    settileItmes(tiles);
  }, [tiles]);

  const tilesList = tileItmes.map((tile, index) => (
    <Tile
      {...tile}
      tile={tile}
      inpName="tiles"
      key={index}
      rbtn={rbtn}
      checkable={checkable}
      checkHandler={checkHandler}
    />
  ));

  return tileItmes.length ? (
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
        <ContentEditable
          tagName="p"
          html={sChildP}
          disabled={false}
          className="child-p"
          innerRef={sChildRef}
          onChange={({ target }) => setSChildP(target.value)}
        />
      </div>
      <div className="interior-block">
        <Sortable
          className="Interior-content interior-tile-content"
          onChange={(order, sortable, evt) => {
            const arr = order.map(ord => tiles.find(el => el.id === +ord));

            settileItmes(arr);
          }}
        >
          {tilesList}
        </Sortable>
      </div>
    </Col>
  ) : null;
};

export default Tiles;

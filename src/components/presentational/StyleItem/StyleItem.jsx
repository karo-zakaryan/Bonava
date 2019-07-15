import React from "react";
import { Card } from "react-bootstrap";

const StyleItem = ({ id, attributes }) => {
  const door = attributes.filter(attr => attr.type === "Дверь");
  const laminate = attributes.filter(attr => attr.type === "Паркет");
  const wall = attributes.filter(
    attr => attr.type === "Плитка стен ванной и туалета"
  );

  const doorSrc = door[0]
    ? door[0].thumbnail.image
    : "http://bonava.kilonewton.ru/images/EMLReCDoaF78DJKp2mgYS50pnfTEC9Co6ckSjl6n.png";
  const laminSrc = laminate[0]
    ? laminate[0].thumbnail.image
    : "http://bonava.kilonewton.ru/images/GGyDfwF98WxqDoahAOGv9n0KMC0HVXIu3X2MEl9B.png";
  const wallSrc = wall[0]
    ? wall[0].thumbnail.image
    : "http://bonava.kilonewton.ru/images/m49x6zpzxzaBxQtwgh7flQdv1wqd8hSCTMCHqhCU.png";

  return (
    <Card className="card-cont">
      <Card.Body>
        <Card.Title className="style_title">Стиль {id}</Card.Title>
        <div className="card-bt">
          <Card.Img className="door-img" src={doorSrc} />

          <div>
            <Card.Img className="lamin-img" src={laminSrc} />
            <div className="wall-cont">
              <div className="wall-item">
                <p className="style_title">Фон</p>
                <div
                  style={{ backgroundImage: `url(${wallSrc})` }}
                  className="wall"
                />
              </div>
              <div className="akc-cont">
                <p className="style_title">Акцент</p>
                <div
                  style={{ backgroundImage: `url(${wallSrc})` }}
                  className="wall"
                />
                <div />
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StyleItem;

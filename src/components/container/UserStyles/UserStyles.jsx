import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Col, Row, Tab, Nav, Image, Alert, Carousel } from "react-bootstrap";
import StyleItem from "../../presentational/StyleItem/StyleItem";
import Forgeviewer from "../../presentational/Forgeviewer/Forgeviewer";

import "./UserStyles.css";
import setActiveStyle from "../../../store/actions/setActiveStyle/setActiveStyle";

const UserStyles = ({
  styles,
  activeStyle,
  activeProj,
  activePackage,
  activeRequisition,
  setActiveStyle
}) => {
  const [styleData, setStyleData] = useState([]);
  // const [activeStyle, setActiveStyle] = useState(null);
  const [gridKey, setGridKey] = useState(2);
  const [refId, setRefId] = useState(0);

  const [indexA, setIndexA] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setDirection(e.direction);
    setIndexA(selectedIndex);

    activeStyle.thumbnails.forEach((slide, index) => {
      if (selectedIndex === index) {
        setRefId(slide.room_reference_id);
      }
    });
  };

  useEffect(() => {
    if (!styleData.length) {
      const data = styles.data.filter(
        item => item.package_id === activePackage.id
      );
      // setActiveStyle(data[0]);
      setStyleData(data);
    }
    if (Object.keys(activeStyle).length && refId === 0) {
      activeStyle.thumbnails.length &&
        setRefId(activeStyle.thumbnails[0].room_reference_id);
    }
    if (Object.keys(activeStyle).length) {
      activeStyle.thumbnails.forEach((slide, index) => {
        if (slide.room_reference_id === refId) {
          handleSelect(index, { direction: "next" });
        }
      });
      if (activeStyle.thumbnails.length < indexA) {
        handleSelect(0, { direction: "next" });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles, activeStyle]);

  const selectHandler = selectedKey => {
    setGridKey(+selectedKey);
  };

  const styleHeaders =
    styleData.length && Object.keys(activeStyle).length ? (
      styleData.map(item => (
        <div
          className="head-cont Interior-content"
          key={item.id}
          onClick={() => setActiveStyle(item)}
        >
          <div className="span-cont">
            <span className={activeStyle.id === item.id ? "active-span" : ""}>
              {item.name}
            </span>
          </div>

          <StyleItem id={item.id} {...item} />
        </div>
      ))
    ) : (
      <div className="empty-message">В выбранном пакете отсутствуют стили</div>
    );

  const slideItems =
    Object.keys(activeStyle).length &&
    activeStyle.thumbnails.map((slide, index) => (
      <Carousel.Item key={index}>
        <Image src={slide.image} />
      </Carousel.Item>
    ));

  const area = activeRequisition.area ? activeRequisition.area : 80;

  return (
    <Col xs={12} xl={9} className="packages">
      <Row className="pack-top">
        <Col
          md={8}
          className="model_slide"
          style={{
            alignItems:
              (Object.keys(activeStyle).length &&
                activeStyle.thumbnails.length) ||
              gridKey === 2
                ? "flex-start"
                : "center"
          }}
        >
          {gridKey === 2 ? (
            <Forgeviewer urn={activeRequisition["3d_link"].substring(4)} />
          ) : Object.keys(activeStyle).length &&
            activeStyle.thumbnails.length ? (
            <Carousel
              // slide={false}
              fade
              interval={0}
              activeIndex={indexA}
              direction={direction}
              onSelect={handleSelect}
            >
              {slideItems}
            </Carousel>
          ) : (
            <Alert variant="danger">Слайд не найдена</Alert>
          )}
        </Col>
        <Col md={4}>
          <div>
            <div className="pack-data">
              <span>Объект</span>
              <span>{activeProj.name}</span>
            </div>
            <div className="pack-data">
              <span>№ квартиры </span>
              <span>
                {activeRequisition ? activeRequisition.bona_lvu_name : null}
              </span>
            </div>
            <div className="pack-data">
              <span>Площадь</span>
              <span>{area} м²</span>
            </div>
            <div className="pack-data">
              <span>Этаж</span>
              <span>{activeRequisition.flor}</span>
            </div>
            <div className="pack-data">
              <span>Спальни</span>
              <span>{activeRequisition ? activeRequisition.name : null}</span>
            </div>
            <div className="pack-data">
              <span>Стоимость отделки</span>
              <span>{parseInt(area * activeRequisition.price)} ₽</span>
            </div>
          </div>
          <Tab.Container defaultActiveKey={2}>
            <Nav
              variant="pills"
              className="flex-nowrap justify-content-center"
              onSelect={selectHandler}
            >
              <Nav.Item className="tab-item d-formation">
                <Nav.Link eventKey={1}>2D</Nav.Link>
              </Nav.Item>
              <Nav.Item className="tab-item d-formation">
                <Nav.Link eventKey={2}>3D</Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </Col>
      </Row>
      <Row className="style_bt">{styleHeaders}</Row>
    </Col>
  );
};

const mapStateToProps = ({ tree, type }) => ({
  styles: tree.styles,
  activeProj: type.activeProjectStair.proj,
  activeStyle: type.activeStyle,
  activePackage: type.activePackage,
  activeRequisition: type.currentRequisition
});

export default connect(
  mapStateToProps,
  { setActiveStyle }
)(UserStyles);

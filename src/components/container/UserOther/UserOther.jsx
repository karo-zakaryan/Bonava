import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, FormGroup, Row, Form, Button } from "react-bootstrap";
import setActivePackage from "../../../store/actions/setActivePackage/setActivePackage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./UserOther.css";
import Interiors from "../Interiors/Interiors";
import WallColors from "../WallColors/WallColors";
import Laminates from "../Laminates/Laminates";
import eqCheckData from "../../../store/actions/eqCheckData/eqCheckData";
import { withRouter } from "react-router-dom";

const UserOther = ({
  packages,
  history,
  setActivePackage,
  activeProj,
  activeStair,
  activePackage,
  activeStyle,
  activeRequisition,
  user,
  eqCheckData,
  checkData
}) => {
  const [isFinishLoad, setIsFinishLoad] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    patronymic: "",
    date: null
  });

  const {
    date,
    email,
    firstName,
    lastName,
    patronymic,
    phoneNumber
  } = formData;

  useEffect(() => {
    user &&
      Object.keys(user).length &&
      setFormData({
        firstName: user.firstname,
        lastName: user.lastname,
        phoneNumber: user.phone,
        email: user.email,
        patronymic: user.patronymic ? user.patronymic : "",
        date: null
      });
  }, [user]);

  useEffect(
    () => {
      packages.data.length &&
        !Object.keys(activePackage).length &&
        setActivePackage(packages.data[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [packages]
  );

  useEffect(
    () => {
      if (
        Object.keys(activePackage).length &&
        activePackage.attributes.length &&
        !isFinishLoad &&
        checkData.doors.length
      ) {
        const localDoors = activePackage.attributes.filter(
          item => item.type === "Дверь"
        );
        const localWalls = activePackage.attributes.filter(
          item => item.type === "Плитка стен ванной и туалета"
        );
        const localLaminates = activePackage.attributes.filter(
          item => item.type === "Паркет"
        );
        const checkData = {
          tiles: [],
          doors: localDoors,
          showers: [],
          laminates: localLaminates,
          walls: localWalls
        };
        setIsFinishLoad(true);
        eqCheckData(checkData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePackage, checkData, isFinishLoad]
  );

  const area =
    activeRequisition && activeRequisition.area ? activeRequisition.area : 80;

  const handleDate = date => setFormData({ ...formData, date });

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  return activePackage ? (
    <Col xs={12} xl={8} className="packages">
      <Row className="other-top">
        <Col md={8} className="inp_group_container">
          <div className="other_page_fg_container">
            <FormGroup controlId="change_handler">
              <DatePicker
                selected={date}
                onChange={handleDate}
                className="other_page_input"
                placeholderText="Дата:"
              />
            </FormGroup>
          </div>
          <div className="other_page_fg_container">
            <FormGroup controlId="change_handler">
              <Form.Control
                value={lastName}
                name="lastName"
                onChange={onChange}
                className="other_page_input"
                placeholder="Фамилия:"
              />
            </FormGroup>
            <FormGroup controlId="change_handler">
              <Form.Control
                value={firstName}
                name="firstName"
                onChange={onChange}
                className="other_page_input"
                placeholder="Имя:"
              />
            </FormGroup>
            <FormGroup className="m-0" controlId="change_handler">
              <Form.Control
                value={patronymic}
                name="patronymic"
                onChange={onChange}
                className="other_page_input"
                placeholder="Отчество"
              />
            </FormGroup>
          </div>
          <div className="other_page_fg_container">
            <FormGroup controlId="change_handler">
              <Form.Control
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                className="other_page_input"
                placeholder="Email:"
              />
            </FormGroup>
            <FormGroup controlId="change_handler" className="m-0">
              <Form.Control
                value={phoneNumber}
                name="phoneNumber"
                onChange={onChange}
                className="other_page_input"
                placeholder="Телефон:"
              />
            </FormGroup>
          </div>
        </Col>
        <Col md={4}>
          <div>
            <div className="pack-data">
              <span>Объект</span>
              <span>{activeProj.name}</span>
            </div>
            <div className="pack-data">
              <span>Очередь</span>
              <span>{activeStair.name}</span>
            </div>
            <div className="pack-data">
              <span>№ квартиры </span>
              <span>{activeRequisition.bona_lvu_name}</span>
            </div>
            <div className="pack-data">
              <span>Площадь</span>
              <span>{activeRequisition.area} м²</span>
            </div>
            <div className="pack-data">
              <span>Этаж</span>
              <span>{activeRequisition.flor}</span>
            </div>
            <div className="pack-data">
              <span>Спальни</span>
              <span>{activeRequisition.name}</span>
            </div>
            <div className="pack-data">
              <span>Цена</span>
              <span>
                {parseInt(
                  area * activeRequisition.price ? activeRequisition.price : 1
                )}{" "}
                ₽
              </span>
            </div>
            <div className="pack-data">
              <span>Пакет</span>
              <span>{activePackage.name ? activePackage.name : ""}</span>
            </div>
            <div className="pack-data">
              <span>Стиль</span>
              <span>{activeStyle.name ? activeStyle.name : ""}</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="col-12">
          <Row className="top-section">
            <Interiors md={4} doors={checkData.doors} checkDisable checkable />
            <WallColors md={4} walls={checkData.walls} checkDisable checkable />
            <Laminates
              md={4}
              laminates={checkData.laminates}
              checkDisable
              checkable
            />
          </Row>
        </div>
      </Row>
      <div className="footer_actions">
        <Button
          variant="outline-success"
          className="close-btn"
          // onClick={handleClose}
        >
          Отмена
        </Button>
        <Button
          variant="success"
          className="save-btn"
          onClick={() => history.push("/admin/userRequisition")}
        >
          Сохранить
        </Button>
      </div>
    </Col>
  ) : null;
};

const mapStateToProps = ({ tree, type, auth, ridata }) => ({
  packages: tree.packages,
  activeProj: type.activeProjectStair.proj,
  activeStair: type.activeProjectStair.stair,
  checkData: ridata.checkData,
  activePackage: type.activePackage,
  activeStyle: type.activeStyle,
  activeRequisition: type.currentRequisition,
  user: auth.user
});

export default connect(
  mapStateToProps,
  { setActivePackage, eqCheckData }
)(withRouter(UserOther));

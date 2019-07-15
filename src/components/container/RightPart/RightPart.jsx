import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import API from "../../../api";

import getData from "../../../store/actions/getData/getData";
import eqCheckData from "../../../store/actions/eqCheckData/eqCheckData";
import setPackData from "../../../store/actions/setPackData/setPackData";
import addCheckData from "../../../store/actions/addCheckData/addCheckData";
import filterCheckData from "../../../store/actions/filterCheckData/filterCheckData";
import setStyleData from "../../../store/actions/setStyleData/setStyleData";
import setSaveData from "../../../store/actions/setSaveData/setSaveData";
import { useBonavaApi } from "../../../customHooks/useBonavaApi";

import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  Col,
  Row,
  Tab,
  Nav,
  Button,
  Form,
  Image,
  Carousel
} from "react-bootstrap";
import { TiThLargeOutline, TiThMenuOutline } from "react-icons/ti";

// import Tiles from "../Tiles/Tiles";
// import Showers from "../Showers/Showers";
import Interiors from "../Interiors/Interiors";
import Laminates from "../Laminates/Laminates";
import WallColors from "../WallColors/WallColors";
import UploadModal from "../../presentational/UploadModal/UploadModal";

import "./RightPart.css";

const RightPart = ({
  getData,
  data,
  node,
  addCheckData,
  filterCheckData,
  currentPackage,
  currProject,
  currStyle,
  isProj,
  isPck,
  isSt,
  setStyleData,
  eqCheckData,
  setPackData,
  activeId,
  checkData,
  setSaveData,
  isChildstyle
}) => {
  const [isEff, setIsEff] = useState(false);
  const [gridKey, setGridKey] = useState(2);
  const [isLoading, setisLoading] = useState(false);
  const [isPackLoad, setisPackLoad] = useState(false);
  const [isStLoad, setisStLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [{ response }] = useBonavaApi("get", "/attributes");

  const { doors, walls, laminates } = data;
  const isCheckbox = isPck && !isProj && !isSt;
  const downloadDisabled = !(
    !doors.length &&
    !walls.length &&
    !laminates.length
  );

  const downloadItems = isEff => {
    setIsEff(isEff);
    response.data.map(async (item, index, arr) => {
      !isEff && setisLoading(true);
      const isSameType =
        index + 1 < arr.length ? arr[index + 1].type !== item.type : true;
      if (item.type !== "20" && isSameType) {
        const { data } = await Axios.get(
          `http://bonava.kilonewton.ru/api/attributes?type=${item.type}`
        );
        const doors = item.type === "Дверь" && data.data;
        const walls = item.type === "Плитка стен ванной и туалета" && data.data;
        const laminates = item.type === "Паркет" && data.data;
        if (doors) {
          const updD = doors.map(door => ({
            ...door,
            isCheck: false,
            isChRbtn: false
          }));
          isEff && getData("doors", updD);
        }
        if (walls) {
          const updW = walls.map(wall => ({
            ...wall,
            isCheck: false,
            isChRbtn: false
          }));

          isEff && getData("walls", updW);
        }
        if (laminates) {
          const updL = laminates.map(laminate => ({
            ...laminate,
            isCheck: false,
            isChRbtn: false
          }));

          isEff && getData("laminates", updL);
        }
        !isEff && setisLoading(false);
      }
    });
  };

  useEffect(() => {
    if (response.data.length) {
      downloadItems(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const selectHandler = selectedKey => {
    setGridKey(+selectedKey);
  };

  const checkHandler = event => {
    const { id, name, checked, type } = event.target;
    if (type !== "radio") {
      addCheckData(id, name, checked);
    } else {
      addCheckData(id, name, checked, checked);
    }
  };

  const uploadHandler = () => setShowModal(true);

  const handleClose = (e, isCancel) => {
    setShowModal(false);
  };

  const uploadPackDataHandler = async () => {
    setisPackLoad(true);
    const { name, price, project_id, id } = currentPackage;
    const { doors, laminates, walls } = checkData;
    const sendedDoors = doors.filter(door => door.isCheck);
    const sendedLamins = laminates.filter(lam => lam.isCheck);
    const sendedWalls = walls.filter(wall => wall.isCheck);

    const elements = [...sendedDoors, ...sendedLamins, ...sendedWalls];
    const elInts = elements.map(el => el.id);

    try {
      const {
        data: { data }
      } = await API.patch(`packages/${id}`, {
        name,
        price,
        project_id,
        attributes: elInts
      });

      const doors = data.attributes.filter(attr => attr.type === "Дверь");
      const walls = data.attributes.filter(
        attr => attr.type === "Плитка стен ванной и туалета"
      );
      const laminates = data.attributes.filter(attr => attr.type === "Паркет");

      setSaveData({ doors, walls, laminates });
      setPackData(data);
    } catch (error) {
      console.error(error);
    }
    setisPackLoad(false);
  };

  const uploadStDataHandler = async () => {
    setisStLoad(true);
    const { name, id } = currStyle;
    const { doors, laminates, walls } = checkData;
    const sendedDoors = doors.filter(door => door.isChRbtn);
    const sendedLamins = laminates.filter(lam => lam.isChRbtn);
    const sendedWalls = walls.filter(wall => wall.isChRbtn);
    const elements = [...sendedDoors, ...sendedLamins, ...sendedWalls];
    const elInts = elements.map(el => el.id);

    try {
      const {
        data: { data }
      } = await API.patch(`styles/${id}`, {
        name,
        attributes: elInts
      });

      setStyleData(data);
    } catch (error) {
      console.error(error);
    }
    setisStLoad(false);
  };

  const slideItems =
    currStyle.thumbnails &&
    currStyle.thumbnails.map((slide, index) => (
      <Carousel.Item key={index}>
        <Image src={slide.image} />
      </Carousel.Item>
    ));

  return (
    <Col xs={12} xl={9}>
      <Row className="right-bar">
        <Col xs={12} md={8} className="left-side">
          <Tab.Container defaultActiveKey={2}>
            <Nav
              variant="pills"
              className="flex-nowrap"
              onSelect={selectHandler}
            >
              <Nav.Item className="tab-item">
                <Nav.Link eventKey={1}>
                  <TiThLargeOutline />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="tab-item">
                <Nav.Link eventKey={2}>
                  <TiThMenuOutline />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
          <UploadModal show={showModal} handleClose={handleClose} />

          {isEff && (
            <Button
              className="download-btn"
              onClick={() => downloadItems(false)}
            >
              Загрузить
            </Button>
          )}
          {isSt && downloadDisabled && (
            <>
              {!isStLoad ? (
                <Button className="download-btn" onClick={uploadStDataHandler}>
                  Сохранить
                </Button>
              ) : (
                <div className="loader_container">
                  <ClipLoader color="#013B2D" size={15} />
                </div>
              )}
              <Button className="download-btn" onClick={uploadHandler}>
                Загрузить визуализацию
              </Button>
            </>
          )}
          {isPck &&
            downloadDisabled &&
            (!isPackLoad ? (
              <Button className="download-btn" onClick={uploadPackDataHandler}>
                Сохранить
              </Button>
            ) : (
              <div className="loader_container">
                <ClipLoader color="#013B2D" size={15} />
              </div>
            ))}
        </Col>
        <Col xs={12} md={4}>
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
        </Col>
      </Row>
      {!isEff ? (
        <Row
          className="main-data-wrapper p-0"
          style={{
            flexDirection: gridKey === 2 ? "column" : "column-reverse"
          }}
        >
          <div className="col-12">
            <Row
              style={{ marginTop: gridKey === 1 ? 30 : "auto" }}
              className="top-section"
            >
              <Interiors
                md={4}
                doors={checkData.doors}
                isChildstyle={isChildstyle}
                checkHandler={checkHandler}
                checkable={isCheckbox}
              />
              <WallColors
                md={4}
                walls={checkData.walls}
                isChildstyle={isChildstyle}
                checkHandler={checkHandler}
                checkable={isCheckbox}
              />
              <Laminates
                md={4}
                laminates={checkData.laminates}
                isChildstyle={isChildstyle}
                checkHandler={checkHandler}
                checkable={isCheckbox}
              />
            </Row>
          </div>

          <Row
            style={{
              marginTop: gridKey === 2 ? 30 : "auto",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {isSt && currStyle.thumbnails && currStyle.thumbnails.length ? (
              <Carousel>{slideItems}</Carousel>
            ) : null}
            {/* {tiles.length ? (
                <Tiles
                  lg={8}
                  tiles={tiles}
                  isChildstyle={isChildstyle}
                  checkHandler={checkHandler}
                  checkable={!isCheckbox}
                />
              ) : null}
              {showers.length ? (
                <Showers
                  lg={4}
                  showers={showers}
                  isChildstyle={isChildstyle}
                  checkHandler={checkHandler}
                  checkable={!isCheckbox}
                />
              ) : null} */}
          </Row>
        </Row>
      ) : isLoading ? (
        <ClipLoader />
      ) : null}
    </Col>
  );
};

const mapStateToProps = ({ ridata, type, tree }) => ({
  data: ridata.data,
  checkData: ridata.checkData,
  currentPackage: type.currentPackage,
  currProject: type.currentProject,
  currStyle: type.currentStyle,
  isProj: type.isProj,
  isPck: type.isPck,
  isSt: type.isSt,
  tree: tree.treeConfigs,
  isChildstyle: tree.isChildstyle,
  currentStyle: tree.currentStyle,
  node: tree.node,
  isStyle: tree.isStyle,
  activeId: tree.activeId
});

const mapDispatchToProps = {
  getData,
  addCheckData,
  eqCheckData,
  setPackData,
  setStyleData,
  filterCheckData,
  setSaveData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPart);

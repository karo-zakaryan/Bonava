import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Table } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Forgeviewer from "../../presentational/Forgeviewer/Forgeviewer";

import setActiveStyle from "../../../store/actions/setActiveStyle/setActiveStyle";
import setActivePackage from "../../../store/actions/setActivePackage/setActivePackage";

import "./UserPackages.css";
import setActiveProjStair from "../../../store/actions/setActiveProjStair/setActiveProjStair";

const UserPackages = ({
  packages,
  projects,
  setActivePackage,
  setActiveProjStair,
  setActiveStyle,
  styles,
  activePackage,
  activeProj,
  activeRequisition
}) => {
  const [rPacks, setRPacks] = useState([]);

  useEffect(
    () => {
      projects.forEach(item => {
        item.stairCases.forEach(stair => {
          if (activeRequisition.stair_case_id === stair.id) {
            setActiveProjStair({ proj: item, stair });
          }
        });
      });
      // console.log(activeRequisition, projects, packages);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (packages.data.length && !Object.keys(activePackage).length && activeProj)  {
        const pcks = packages.data.filter(pck => pck.project_id === activeProj.id);
        setRPacks(pcks);
        setActivePackage(packages.data[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [packages, activeProj]
  );

  useEffect(
      () => {
        if (!rPacks.length && activeProj)  {
          const pcks = packages.data.filter(pck => pck.project_id === activeProj.id);
          setRPacks(pcks);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [rPacks]
  );

  useEffect(
    () => {
      if (Object.keys(activePackage).length) {
        const data = styles.data.filter(
          item => item.package_id === activePackage.id
        );
        setActiveStyle(data.length ? data[0] : {});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePackage]
  );

  const theadEls =
    activePackage &&
      rPacks.map(item => (
      <th key={item.id} onClick={() => setActivePackage(item)}>
        <span className={activePackage.id === item.id ? "active-span" : ""}>
          {item.name}
        </span>
      </th>
    ));

  const tbodyEls = rPacks.map((item, index) => (
    <td key={item.id}>
      {" "}
      <div className="dot" />{" "}
    </td>
  ));

  const fPriceEls = rPacks.map(item => (
    <td key={item.id}>
      <b>{item.price}</b>
    </td>
  ));

  const area =
    activeRequisition && activeRequisition.area ? activeRequisition.area : 80;

  return activeRequisition ? (
    <Col xs={12} xl={9} className="packages">
      <Row className="pack-top">
        <Col md={8}>
          <Forgeviewer urn={activeRequisition["3d_link"].substring(4)} />
        </Col>
        <Col md={4}>
          <div>
            <div className="pack-data">
              <span>Объект</span>
              <span>{activeProj ? activeProj.name : ""}</span>
            </div>
            <div className="pack-data">
              <span>№ квартиры </span>
              <span>{activeRequisition.bona_lvu_name}</span>
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
              <span>{activeRequisition.name}</span>
            </div>
            <div className="pack-data">
              <span>Стоимость отделки</span>
              <span>{parseInt(area * activeRequisition.price)} ₽</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <PerfectScrollbar>
          <Table responsive>
            <thead>
              <tr>
                <th />
                {theadEls}
              </tr>
            </thead>
            <tbody>
              <tr className="parent-tr">
                <td>Помещение:</td>
              </tr>
              <tr>
                <td className="child-td">Сан/узел</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">Ванная</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">Балкон</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">Комнаты</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">Кухня</td>
                {tbodyEls}
              </tr>
              <tr className="parent-tr">
                <td>Материалы:</td>
              </tr>
              <tr>
                <td className="child-td">Паркет</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">Плитка</td>
                {tbodyEls}
              </tr>
              <tr>
                <td className="child-td">
                  <b>Цена за 1 м2</b>
                </td>
                {fPriceEls}
              </tr>
              <tr>
                <td className="child-td">
                  <b>
                    <p>Стоимость</p>
                    <p>отделки</p>
                  </b>
                </td>
                {rPacks.map(item => (
                  <td key={item.id}>
                    <b>
                      {area * activePackage.price ? activePackage.price : 1}
                    </b>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </PerfectScrollbar>
      </Row>
    </Col>
  ) : null;
};

const mapStateToProps = ({ tree, type }) => ({
  packages: tree.packages,
  activeProj: type.activeProjectStair.proj,
  styles: tree.styles,
  projects: tree.projectResponse.data,
  activePackage: type.activePackage,
  activeRequisition: type.currentRequisition
});

export default connect(
  mapStateToProps,
  { setActivePackage, setActiveStyle, setActiveProjStair }
)(UserPackages);

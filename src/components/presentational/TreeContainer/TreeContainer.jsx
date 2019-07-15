import React, { useState, useEffect, useRef } from "react";
import API from "../../../api";
import { connect } from "react-redux";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Dropdown, Modal, Form, Button } from "react-bootstrap";

import renameProject from "../../../store/actions/renameProject/renameProject";
import renamePackage from "../../../store/actions/renamePackage/renamePackage";
import setPackages from "../../../store/actions/setPackages/setPackages";
import setCurrPackage from "../../../store/actions/setCurrPackage/setCurrPackage";
import setCurrStyle from "../../../store/actions/setCurrStyle/setCurrStyle";
import setStyleData from "../../../store/actions/setStyleData/setStyleData";
import setPackData from "../../../store/actions/setPackData/setPackData";
import editTreeParent from "../../../store/actions/editTreeParent/editTreeParent";
import editTreeChild from "../../../store/actions/editTreeChild/editTreeChild";
import setNode from "../../../store/actions/setNode/setNode";
import setActive from "../../../store/actions/setActive/setActive";
import PackageSettings from "../PackageSettings/PackageSettings";
import setCurrentProj from "../../../store/actions/setCurrentProj/setCurrentProj";
import renameStyle from "../../../store/actions/renameStyle/renameStyle";
import deleteProject from "../../../store/actions/deleteProject/deleteProject";
import eqCheckData from "../../../store/actions/eqCheckData/eqCheckData";
import setTree from "../../../store/actions/setTree/setTree";

const TreeContainer = ({
  onClick,
  decorators,
  style,
  node,
  renameStyle,
  renameProject,
  renamePackage,
  deleteProject,
  editTreeParent,
  editTreeChild,
  setPackData,
  setStyleData,
  activeId,
  myNode,
  setNode,
  authData,
  setTree,
  setPackages,
  currentProject,
  setCurrPackage,
  setCurrStyle,
  eqCheckData,
  treeData,
  chDt,
  setCurrentProj
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [isPackAdded, setisPackAdded] = useState(false);
  const [isStyleAdded, setisStyleAdded] = useState(false);
  const [value, setValue] = useState(node.name);

  const menuRef = useRef(null);
  const { doors, walls, laminates, showers, tiles } = authData;
  const { doors: chD, walls: chW, laminates: chL } = chDt;
  const triangleRotated = node.children && node.children.length && node.toggled;
  const newStyle = {
    ...style,
    toggle: {
      ...style.toggle,
      arrow: {
        ...style.toggle.arrow,
        fill: "#0F99D8",
        transform: `rotate(${triangleRotated ? "-30" : "0"}deg)`
      }
    }
  };
  const iconStyle = { width: 20, height: 20, color: "#1EA1DB", marginRight: 5 };

  const elements = [...doors, ...showers, ...laminates, ...walls, ...tiles];
  const elInts = elements.map(el => el.id);

  const sendedDoors = chD.filter(door => door.isCheck);
  const sendedLamins = chL.filter(lam => lam.isCheck);
  const sendedWalls = chW.filter(wall => wall.isCheck);

  const chEls = [...sendedDoors, ...sendedWalls, ...sendedLamins];
  const chElInts = chEls.map(el => el.id);

  useEffect(() => {
    if (node.styleChild) {
      setNode(node);
    }
    if (isPackAdded && activeId !== 0) {
      addPackage(activeId);
      setisPackAdded(false);
    }
    if (isStyleAdded && activeId !== 0) {
      addStyle(activeId);
      setisStyleAdded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, activeId, isPackAdded, isStyleAdded, myNode]);

  const currProjReq = async project_id => {
    try {
      const { data } = await API.get(`projects/${project_id}`);
      if (data.data.attributes) {
        const localDoors = data.data.attributes.filter(
          item => item.type === "Дверь"
        );
        const localWalls = data.data.attributes.filter(
          item => item.type === "Плитка стен ванной и туалета"
        );
        const localLaminates = data.data.attributes.filter(
          item => item.type === "Паркет"
        );
        const checkData = {
          tiles: [],
          doors: localDoors,
          showers: [],
          laminates: localLaminates,
          walls: localWalls
        };

        eqCheckData(checkData);
      }
      setCurrentProj(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const currPackageReq = async package_id => {
    try {
      const { data } = await API.get(`packages/${package_id}`);
      const localDoors = data.data.attributes.filter(
        item => item.type === "Дверь"
      );
      const localWalls = data.data.attributes.filter(
        item => item.type === "Плитка стен ванной и туалета"
      );
      const localLaminates = data.data.attributes.filter(
        item => item.type === "Паркет"
      );
      const checkData = {
        tiles: [],
        doors: localDoors,
        showers: [],
        laminates: localLaminates,
        walls: localWalls
      };

      eqCheckData(checkData);
      setCurrPackage(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const currStyleReq = async style_id => {
    try {
      const { data } = await API.get(`styles/${style_id}`);
      const localDoors = data.data.attributes.filter(
        item => item.type === "Дверь"
      );
      const localWalls = data.data.attributes.filter(
        item => item.type === "Плитка стен ванной и туалета"
      );
      const localLaminates = data.data.attributes.filter(
        item => item.type === "Паркет"
      );
      const checkData = {
        tiles: [],
        doors: localDoors,
        showers: [],
        laminates: localLaminates,
        walls: localWalls
      };

      eqCheckData(checkData, true);
      setCurrStyle(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addHandler = () => {
    const updTree = treeData.map(td => {
      if (td.id === node.id) {
        return {
          ...td,
          toggled: true
        };
      } else {
        const pCh = td.children.map(tp => {
          if (tp.id === node.id) {
            return {
              ...tp,
              toggled: true
            };
          } else {
            return tp;
          }
        });

        return {
          ...td,
          children: pCh
        };
      }
    });
    // const updTree = treeData.map(tree => {
    //   if (tree.id === node.id) {
    //     return {
    //       ...tree,
    //       toggled: true
    //     };
    //   } else {
    //     return tree;
    //   }
    // });
    // console.log(node, treeData);
    // console.log(updTree, "updTree");
    setTree(updTree);

    // node.toggled = true;
    if (node.parent) {
      setisPackAdded(true);
    }
    if (node.styleChild) {
      setisStyleAdded(true);
    }
  };

  const addPackage = async () => {
    try {
      const {
        data: { data }
      } = await API.post("packages", {
        name: "Новый вид",
        project_id: node.id,
        attributes: elInts,
        price: 100
      });

      editTreeParent(node.id, data.id);
      setPackages(data);
      setPackData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStyle = async () => {
    try {
      const {
        data: { data }
      } = await API.post("styles", {
        name: "Новый стиль",
        package_id: node.id,
        attributes: chElInts
      });
      const { elements, id, name, thumbnails, package_id } = data;

      editTreeChild(
        node.project_id,
        package_id,
        elements,
        id,
        name,
        thumbnails
      );
      setStyleData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renameHandler = () => {
    setmodalShow(true);
    node.parent && renameProject(true, node.id, node.name);
    node.styleChild && renamePackage(true, node.id, node.name, node.project_id);
    node.child &&
      renameStyle(true, node.id, node.name, node.project_id, node.package_id);
  };

  const handleClick = event => {
    onClick(event);
    setNode(node);

    if (node.parent) {
      currProjReq(node.id);
    }

    if (node.styleChild) {
      currPackageReq(node.id);
    }

    if (node.child) {
      currStyleReq(node.id);
    }
  };

  const settingHandler = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const removeHandler = async () => {
    const { id } = currentProject;

    try {
      await API.delete(`projects/${id}`);

      deleteProject(id);
    } catch (error) {
      console.error(error);
    }
  };

  const renameProjectHandler = async (project_id, name) => {
    try {
      await API.patch(`projects/${project_id}`, {
        name
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renamePackageHandler = async (package_id, name, price) => {
    try {
      const {
        data: { data }
      } = await API.patch(`packages/${package_id}`, {
        name,
        price
      });

      setCurrPackage(data);
      setPackData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renameStyleHandler = async (style_id, name) => {
    try {
      const {
        data: { data }
      } = await API.patch(`styles/${style_id}`, {
        name
      });

      setCurrStyle(data);
      setStyleData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const changeHandler = ({ target }) => setValue(target.value);

  const rHandler = () => {
    if (node.parent && node.name !== value) {
      renameProjectHandler(node.id, value);
      renameProject(false, node.id, value);
    }

    if (node.styleChild && node.name !== value) {
      renamePackageHandler(node.id, value, node.price);
      renamePackage(false, node.id, value, node.project_id);
    }

    if (node.child && node.name !== value) {
      renameStyleHandler(node.id, value);
      renameStyle(false, node.id, value, node.project_id, node.package_id);
    }
    setmodalShow(false);
  };

  return (
    <div className="tree-container">
      <div className="tree" onClick={handleClick}>
        <decorators.Toggle style={newStyle.toggle} />
        <decorators.Header style={newStyle.header} node={node} />
      </div>

      <Modal
        size="lg"
        centered
        show={modalShow}
        onHide={() => null}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="m-header">Переименовать</Modal.Header>
        <Modal.Body className="d-flex">
          <Form.Control size="sm" value={value} onChange={changeHandler} />
          <Button
            disabled={!value}
            size="sm"
            onClick={rHandler}
            style={{ margin: "0 10px" }}
          >
            ОК
          </Button>
          <Button
            size="sm"
            onClick={() => setValue(node.name)}
            style={{ margin: "0 10px" }}
          >
            Reset
          </Button>
        </Modal.Body>
      </Modal>

      <Dropdown>
        <Dropdown.Toggle as="div" id="dropdown-basic" />

        {!node.subStyle && !node.subParent && (
          <Dropdown.Menu ref={menuRef}>
            {node.parent && (
              <>
                <Dropdown.Item
                  onClick={addHandler}
                  disabled={activeId !== node.actId}
                >
                  <IoIosAdd style={iconStyle} />
                  Добавить вид
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={removeHandler}
                  disabled={activeId !== node.actId}
                >
                  <IoIosRemove style={iconStyle} />
                  Удалить проект
                </Dropdown.Item>
              </>
            )}
            {node.styleChild && (
              <>
                <Dropdown.Item
                  onClick={addHandler}
                  disabled={activeId !== node.actId}
                  // disabled={styleDisabeld || node.children.length === 3}
                >
                  <IoIosAdd style={iconStyle} />
                  Добавить стиль
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={renameHandler}
                  disabled={activeId !== node.actId}
                >
                  Переименовать
                </Dropdown.Item>
              </>
            )}

            {node.styleChild && (
              <Dropdown.Item
                disabled={activeId !== node.actId}
                // disabled={!myNode.styleChild}
                onClick={settingHandler}
              >
                Параметры
              </Dropdown.Item>
            )}
            {(node.parent || node.child) && (
              <Dropdown.Item
                onClick={renameHandler}
                disabled={activeId !== node.actId}
              >
                Переименовать
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        )}
        <PackageSettings
          node={node}
          show={showModal}
          handleClose={handleClose}
        />
      </Dropdown>
    </div>
  );
};

const mapStateToProps = ({ ridata, tree, type }) => ({
  authData: ridata.data,
  chDt: ridata.checkData,
  activeId: tree.activeId,
  treeData: tree.treeData,
  myNode: tree.node,
  currentPackage: type.currentPackage,
  currentProject: type.currentProject,
  currentStyle: type.currentStyle
});

const mapDispatchToProps = {
  editTreeParent,
  editTreeChild,
  renameProject,
  renamePackage,
  deleteProject,
  setPackages,
  setStyleData,
  setPackData,
  setCurrPackage,
  renameStyle,
  setCurrentProj,
  setCurrStyle,
  setTree,
  setActive,
  setNode,
  eqCheckData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeContainer);

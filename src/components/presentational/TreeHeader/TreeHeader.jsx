import React, { useState } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { MdFolderOpen } from "react-icons/md";

import renameProject from "../../../store/actions/renameProject/renameProject";
import renamePackage from "../../../store/actions/renamePackage/renamePackage";
import setCurrentStyle from "../../../store/actions/setCurrentStyle/setCurrentStyle";
import renameStyle from "../../../store/actions/renameStyle/renameStyle";
import setStyleData from "../../../store/actions/setStyleData/setStyleData";
import setPackData from "../../../store/actions/setPackData/setPackData";

const TreeHeader = ({
  style,
  node,
  renameStyle,
  renameProject,
  renamePackage,
  setStyleData,
  setPackData,
  setCurrentStyle,
  activeId
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [show, setShow] = useState(false);
  const activeHeader = activeId === node.actId;
  const activeBorder = activeHeader ? activeHeader : show;
  const titleStyle = {
    ...style.title,
    color: activeHeader ? "#1EA0DA" : "#000",
    fontSize: 16,
    display: "flex",
    cursor: "pointer"
  };
  const iconStyle = {
    width: 20,
    height: 20,
    color: activeHeader ? "#1EA0DA" : "#909CA1",
    marginRight: 5
  };

  const handleOnMouseEnter = () => setShow(true);

  const handleOnMouseLeave = () => setShow(false);

  const checkHandler = () => setCheckboxChecked(!checkboxChecked);

  const subStyleHandler = () => {
    if (node.subStyle) {
      setCurrentStyle(node.id);
    }
  };

  return (
    <div style={style.base} onClick={subStyleHandler}>
      <div style={titleStyle}>
        {node.checkChild && (
          <Form.Check
            inline
            style={{ margin: 0 }}
            type="checkbox"
            disabled
            id={node.name}
            checked={checkboxChecked}
            onChange={checkHandler}
          />
        )}
        {!node.parent && !node.checkChild && <MdFolderOpen style={iconStyle} />}

        <p
          className="tree-title"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          style={{
            borderBottom: activeBorder
              ? "3px solid #50E3C2"
              : "3px solid #EDF0F2",
            color: activeHeader ? "#1EA0DA" : "#013B2D"
          }}
        >
          {node.name}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ridata, tree }) => ({
  isRename: ridata.isRename,
  activeId: tree.activeId
});

const mapDispatchToProps = {
  renameProject,
  renameStyle,
  setPackData,
  renamePackage,
  setCurrentStyle,
  setStyleData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeHeader);

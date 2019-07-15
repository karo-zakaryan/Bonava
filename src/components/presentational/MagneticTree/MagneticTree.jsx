import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setActive from "../../../store/actions/setActive/setActive";
import { Treebeard, decorators } from "react-treebeard";
import TreeHeader from "../TreeHeader/TreeHeader";
import TreeContainer from "../TreeContainer/TreeContainer";
import "./MagneticTree.css";

const MagneticTree = ({
  data,
  currentProject,
  setActive,
  activeId,
  currentPackage
}) => {
  const [magnData, setmagnData] = useState(data);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    setmagnData(data);
  }, [data]);

  useEffect(() => {
    if (
      activeId !== -1 &&
      !currentPackage.id &&
      magnData.actId !== activeId &&
      currentProject.id !== magnData.id
    ) {
      const childrenMagns = magnData.children.map(mc => ({
        ...mc,
        toggled: false
      }));
      const updatedData = {
        ...magnData,
        children: childrenMagns,
        toggled: false
      };
      setmagnData(updatedData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, currentProject.id, magnData, currentPackage]);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    if (node.actId !== activeId) {
      setActive(node.actId, node.isStyle);
    }

    setCursor(node);
    setmagnData(Object.assign({}, magnData));
  };

  return (
    <>
      <Treebeard
        data={magnData}
        decorators={{
          ...decorators,
          Header: TreeHeader,
          Container: TreeContainer
        }}
        onToggle={onToggle}
      />
    </>
  );
};

const mapStateToProps = ({ tree, type }) => ({
  activeId: tree.activeId,
  currentProject: type.currentProject,
  currentPackage: type.currentPackage
});

export default connect(
  mapStateToProps,
  { setActive }
)(MagneticTree);

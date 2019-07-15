
import { SET_TREE } from "../actionTypes/actionTypes";

const setTree = treeData => {
  return {
    type: SET_TREE,
    treeData
  };
};

export default setTree;

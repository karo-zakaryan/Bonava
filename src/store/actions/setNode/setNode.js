import { SET_NODE } from "../actionTypes/actionTypes";

const setNode = node => {
  return {
    type: SET_NODE,
    node
  };
};

export default setNode;

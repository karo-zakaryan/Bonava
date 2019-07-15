import { SET_CURR_REQUISITION } from "../actionTypes/actionTypes";

const setCurrRequisition = currentRequisition => {
  return {
    type: SET_CURR_REQUISITION,
    currentRequisition
  };
};

export default setCurrRequisition;

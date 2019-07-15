import { SET_SAVED_DATA } from "../actionTypes/actionTypes";

const setSaveData = checkData => {
  return {
    type: SET_SAVED_DATA,
    checkData
  };
};

export default setSaveData;

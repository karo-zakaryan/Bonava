import { SET_PACKAGE_DATA } from "../actionTypes/actionTypes";

const setPackData = data => {
  return {
    type: SET_PACKAGE_DATA,
    data
  };
};

export default setPackData;

import { SET_CURR_PACKAGE } from "../actionTypes/actionTypes";

const setCurrPackage = currentPackage => {
  return {
    type: SET_CURR_PACKAGE,
    currentPackage
  };
};

export default setCurrPackage;

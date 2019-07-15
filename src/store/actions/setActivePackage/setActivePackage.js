import { SET_ACTIVE_PACKAGE } from "../actionTypes/actionTypes";

const setActivePackage = activePackage => {
  return {
    type: SET_ACTIVE_PACKAGE,
    activePackage
  };
};

export default setActivePackage;

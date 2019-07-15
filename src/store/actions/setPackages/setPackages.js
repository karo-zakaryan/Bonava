import { SET_PACKAGES } from "../actionTypes/actionTypes";

const setPackages = packages => {
  return {
    type: SET_PACKAGES,
    packages
  };
};

export default setPackages;

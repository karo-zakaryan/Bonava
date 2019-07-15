import { SET_STYLES } from "../actionTypes/actionTypes";

const setStyles = (stData, styles, packageId, projId) => {
  return {
    type: SET_STYLES,
    stData,
    styles,
    packageId,
    projId
  };
};

export default setStyles;

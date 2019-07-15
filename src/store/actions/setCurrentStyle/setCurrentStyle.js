import { SET_CURRENT_STYLE } from "../actionTypes/actionTypes";

const setCurrentStyle = currentStyle => {
  return {
    type: SET_CURRENT_STYLE,
    currentStyle
  };
};

export default setCurrentStyle;

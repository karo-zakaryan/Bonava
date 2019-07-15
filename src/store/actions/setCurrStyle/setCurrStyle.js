import { SET_CURR_STYLE } from "../actionTypes/actionTypes";

const setCurrStyle = currentStyle => {
  return {
    type: SET_CURR_STYLE,
    currentStyle
  };
};

export default setCurrStyle;

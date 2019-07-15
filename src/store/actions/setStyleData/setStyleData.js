import { SET_STYLE_DATA } from "../actionTypes/actionTypes";

const setStyleData = data => {
  return {
    type: SET_STYLE_DATA,
    data
  };
};

export default setStyleData;

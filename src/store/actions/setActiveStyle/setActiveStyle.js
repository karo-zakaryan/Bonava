import { SET_ACTIVE_STYLE } from "../actionTypes/actionTypes";

const setActiveStyle = activeStyle => {
    return {
        type: SET_ACTIVE_STYLE,
        activeStyle
    };
};

export default setActiveStyle;

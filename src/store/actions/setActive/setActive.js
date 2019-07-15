
import { SET_ACTIVE } from "../actionTypes/actionTypes";

const setActive = (activeId, isStyle) => {
    return {
        type: SET_ACTIVE,
        activeId,
        isStyle
    };
};

export default setActive;

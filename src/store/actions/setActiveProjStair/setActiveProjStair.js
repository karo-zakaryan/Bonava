
import { SET_ACTIVE_PROJ_STAIR } from "../actionTypes/actionTypes";

const setActiveProjStair = activeProjectStair => {
    return {
        type: SET_ACTIVE_PROJ_STAIR,
        activeProjectStair
    };
};

export default setActiveProjStair;

import { SET_CURR_PROJECT } from "../actionTypes/actionTypes";

const setCurrentProj = currentProject => {
  return {
    type: SET_CURR_PROJECT,
    currentProject
  };
};

export default setCurrentProj;

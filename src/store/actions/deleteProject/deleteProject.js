import { DELETE_PROJECT } from "../actionTypes/actionTypes";

const deleteProject = id => {
  return {
    type: DELETE_PROJECT,
    id
  };
};

export default deleteProject;

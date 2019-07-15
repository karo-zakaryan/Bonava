import { GET_PROJECTS } from "../actionTypes/actionTypes";

const getProject = (project, projectResponse) => {
  return {
    type: GET_PROJECTS,
    projectResponse,
    project
  };
};

export default getProject;

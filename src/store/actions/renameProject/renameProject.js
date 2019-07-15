import { RENAME_PROJECT } from "../actionTypes/actionTypes";

const renameProject = (isRename, id, name) => {
  return {
    type: RENAME_PROJECT,
    isRename,
    id,
    name
  };
};

export default renameProject;

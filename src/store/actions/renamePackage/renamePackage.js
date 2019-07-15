import { RENAME_PACKAGE } from "../actionTypes/actionTypes";

const renamePackage = (isRename, id, name, projId) => {
  return {
    type: RENAME_PACKAGE,
    isRename,
    id,
    name,
    projId
  };
};

export default renamePackage;

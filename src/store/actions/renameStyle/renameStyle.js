import { RENAME_STYLE } from "../actionTypes/actionTypes";

const renameStyle = (isRename, id, name, projId, packageId, styleId) => {
  return {
    type: RENAME_STYLE,
    isRename,
    id,
    name,
    packageId,
    projId
  };
};

export default renameStyle;

import { EDIT_TREE_CHILD } from "../actionTypes/actionTypes";

const editTreeChild = (projId, packageId, elements, id, name, thumbnails) => {
  return {
    type: EDIT_TREE_CHILD,
    packageId,
    elements,
    id,
    name,
    thumbnails,
    projId
  };
};

export default editTreeChild;

import { EDIT_TREE_PARENT } from "../actionTypes/actionTypes";

const editTreeParent = (projId, id) => {
  return {
    type: EDIT_TREE_PARENT,
    id,
    projId
  };
};

export default editTreeParent;

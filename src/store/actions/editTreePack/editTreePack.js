import { EDIT_TREE_PACK } from "../actionTypes/actionTypes";

const editTreePack = packages => {
  return {
    type: EDIT_TREE_PACK,
    packages
  };
};

export default editTreePack;

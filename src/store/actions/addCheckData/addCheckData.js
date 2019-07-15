import { ADD_CHECK_DATA } from "../actionTypes/actionTypes";

const addCheckData = (id, name, checked, isChRbtn) => {
  return {
    type: ADD_CHECK_DATA,
    id,
    name,
    checked,
    isChRbtn
  };
};

export default addCheckData;

import { FILTER_CHECK_DATA } from "../actionTypes/actionTypes";

const filterCheckData = (id, name, dArr, mainObj, isRbtn) => {
  return {
    type: FILTER_CHECK_DATA,
    id,
    name,
    dArr,
    mainObj,
    isRbtn
  };
};

export default filterCheckData;

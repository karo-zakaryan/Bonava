import { EQ_CHECK_DATA } from "../actionTypes/actionTypes";

const eqCheckData = (checkData, isS) => {
  return {
    type: EQ_CHECK_DATA,
    checkData,
    isS
  };
};

export default eqCheckData;

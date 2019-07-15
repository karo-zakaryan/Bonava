import { GET_DATA } from "../actionTypes/actionTypes";

const getData = (arrKey, arrValue) => {
  return {
    type: GET_DATA,
    arrKey,
    arrValue
  };
};

export default getData;

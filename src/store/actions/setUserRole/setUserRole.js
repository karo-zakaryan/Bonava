import { SET_USER_ROLE } from "../actionTypes/actionTypes";

const setUserRole = isUser => {
  return {
    type: SET_USER_ROLE,
    isUser
  };
};

export default setUserRole;

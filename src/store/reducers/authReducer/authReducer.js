import {
  SET_USER_ROLE,
  // REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../../actions/actionTypes/actionTypes";

const initialState = {
  isUser: false,
  token: localStorage.getItem("bonavaToken"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { isUser, type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("bonavaToken", payload.access_token);
      return {
        ...state,
        ...payload,
        isUser: true,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("bonavaToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case SET_USER_ROLE:
      return {
        ...state,
        isUser
      };

    default:
      return state;
  }
};

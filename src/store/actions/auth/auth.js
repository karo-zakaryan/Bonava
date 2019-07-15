import API, { setAuthToken } from "../../../api";
import axios from "axios";
import { setAlert } from "../alert/alert";
import {
  // REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actionTypes/actionTypes";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.bonavaToken) {
    setAuthToken(localStorage.bonavaToken);
  }

  try {
    const { data } = await API.get("/my");

    dispatch({
      type: USER_LOADED,
      payload: data.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber
}) => async dispatch => {
  const body = {
    email,
    password,
    password_confirm: password,
    firstname: firstName,
    lastname: lastName,
    phone: phoneNumber,
    "roles[1]": 2
  };

  try {
    await API.post("/register", body);

    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: data
    // });

    // dispatch(loadUser());
  } catch (err) {
    // const errMsg = err.response.data.message;

    // if (errMsg) {
    dispatch(setAlert("The given data was invalid.", "danger"));
    // }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const formData = new FormData();

  formData.set("username", email);
  formData.set("password", password);
  formData.set("grant_type", "password");
  formData.set("scope", "*");
  formData.set("client_id", 2);
  formData.set("client_secret", "gJGZRmctsI4xtv6300O6Vwrt3DkfAfSVlm9VGwaO");

  try {
    const res = await axios.post(
      "http://bonava.kilonewton.ru/oauth/token",
      formData
    );
    setAuthToken(res.data.access_token);
    window.location.reload();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert("Email or password is incorrect.", "danger"));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

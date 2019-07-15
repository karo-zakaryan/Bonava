import axios from "axios";

const instance = axios.create({
  baseURL: "http://bonava.kilonewton.ru/api"
});

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default instance;

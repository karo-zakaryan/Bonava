import shortid from "shortid";
import { showSnack, dismissSnack } from "react-redux-snackbar";

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
  const id = shortid.generate();

  dispatch(
    showSnack(id, {
      label: msg,
      timeout,
      button: { label: "OK" }
    })
  );

  setTimeout(() => dispatch(dismissSnack(id)), timeout);
};

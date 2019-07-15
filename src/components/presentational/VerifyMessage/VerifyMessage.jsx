import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useInterval } from "../../../customHooks/useInterval";
import { FaEnvelopeOpenText } from "react-icons/fa";
import "../../auth/Login/Login.css";
import "../../auth/Register/Register.css";

const VerifyMessage = ({
  history,
  resetHandler,
  messageTitle,
  topMessage,
  titleStyle,
  children
}) => {
  const [count, setCount] = useState(5);

  useInterval(() => {
    if (count !== 0) {
      setCount(count - 1);
    } else {
      history.push("/login");
    }
  }, 1000);

  return (
    <>
      <div className="Login-title-container">
        <FaEnvelopeOpenText
          className="email_open_icon"
          color="#69C4B0"
          size={45}
        />
        <h4 style={titleStyle ? titleStyle : null}>{messageTitle}</h4>
        <h2>{count}</h2>
        <div className="confirm_msg_container">
          <p className="confirm_msg">{topMessage}</p>
          <p className="bottom_message">{children}</p>
        </div>
      </div>
    </>
  );
};

export default withRouter(VerifyMessage);

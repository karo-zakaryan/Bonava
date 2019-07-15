import React from "react";
import "./Progress.css";

const progress = ({ progress }) => (
  <div className="ProgressBar">
    <div className="Progress" style={{ width: progress + "%" }} />
  </div>
);

export default progress;

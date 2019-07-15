import React, { useState, useEffect } from "react";

import "./WallColor.css";

const WallColor = ({
  id,
  value,
  checkDisable,
  inpName,
  checkHandler,
  isCheck,
  thumbnail,
  isChRbtn,
  checkable,
  rbtn
}) => {
  const [wallValue, setwallValue] = useState(value);
  const [isEdit, setisEdit] = useState(false);

  useEffect(() => {
    setwallValue(value);
  }, [value]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setwallValue(target.value);
  };

  return (
    <div className="Wall--container" data-id={id}>
      <div
        style={{ backgroundImage: `url(${thumbnail.image})` }}
        className="Wall"
      >
        {!isEdit ? (
          <p>{wallValue}</p>
        ) : (
          <input
            value={wallValue}
            onChange={changeHandler}
            className="tile_inp"
          />
        )}
        <button onClick={editHandler} className="editBtn">
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>

      {rbtn && (
        <div className="checkbox-container">
          <input
            id={id}
            name={inpName}
            onChange={e => null}
            // defaultChecked
            checked={isChRbtn}
            value={isChRbtn}
            type="radio"
            onClick={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
      {checkable && (
        <div className="Wall--bottom">
          <input
            id={id}
            name={inpName}
            checked={isCheck}
            disabled={checkDisable}
            type="checkbox"
            onChange={checkHandler}
            className="Wall-checkbox"
          />
        </div>
      )}
    </div>
  );
};
export default WallColor;

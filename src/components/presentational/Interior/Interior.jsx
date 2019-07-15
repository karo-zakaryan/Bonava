import React, { useState, useEffect } from "react";

const Interior = ({
  id,
  value,
  thumbnail,
  isCheck,
  checkDisable,
  isChRbtn,
  inpName,
  checkable,
  checkHandler,
  rbtn
}) => {
  const [nameValue, setnameValue] = useState(value);
  const [isEdit, setisEdit] = useState(false);
  const src = thumbnail.image;
  // const src = require(`../../../assets/images/door${id}.jpg`);

  useEffect(() => {
    setnameValue(value);
  }, [value]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setnameValue(target.value);
  };

  return (
    <div className="Interior-item" key={id} data-id={id}>
      <div className="int-wrapper">
        <img className="door" src={src} alt={`${nameValue} ${id}`} />
        {!isEdit ? (
          <p>{nameValue}</p>
        ) : (
          <input
            value={nameValue}
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
            // defaultChecked
            checked={isChRbtn}
            onChange={e => null}
            value={isChRbtn}
            type="radio"
            onClick={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
      {checkable && (
        <div className="checkbox-container">
          <input
            id={id}
            name={inpName}
            checked={isCheck}
            disabled={checkDisable}
            type="checkbox"
            onChange={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
    </div>
  );
};
export default Interior;

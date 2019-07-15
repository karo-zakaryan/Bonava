import React, { useState, useEffect } from "react";

const Element = ({ id, name, thumbnail, type, value, rbtn, checkable }) => {
  const [nameValue, setnameValue] = useState(name);
  const [isEdit, setisEdit] = useState(false);
  const src = thumbnail.image
    ? thumbnail.image
    : require(`../../../assets/images/door${id}.jpg`);

  useEffect(() => {
    setnameValue(name);
  }, [name]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setnameValue(target.value);
  };

  return (
    <div className="Interior-item" key={id} data-id={id}>
      <div>
        <img src={src} alt={`${nameValue} ${id}`} />
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
            // name={inpName}
            defaultChecked
            type="radio"
            // onClick={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
      {checkable && (
        <div className="checkbox-container">
          <input
            id={id}
            // name={inpName}
            defaultChecked
            type="checkbox"
            // onChange={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
    </div>
  );
};
export default Element;

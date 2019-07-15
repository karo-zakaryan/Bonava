import React, { useState, useEffect } from "react";

const Shower = ({ id, inpName, label, checkable, checkHandler, rbtn }) => {
  const [labelValue, setlabelValue] = useState(label);
  const [isEdit, setisEdit] = useState(false);
  const src = require(`../../../assets/images/shower${id}.jpg`);

  useEffect(() => {
    setlabelValue(label);
  }, [label]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setlabelValue(target.value);
  };

  return (
    <div className="Shower-item" key={id} data-id={id}>
      {!isEdit ? (
        <p>{labelValue}</p>
      ) : (
        <input
          value={labelValue}
          onChange={changeHandler}
          className="tile_inp"
        />
      )}
      <button onClick={editHandler} className="editBtn">
        {isEdit ? "Save" : "Edit"}
      </button>

      {rbtn && (
        <div className="checkbox-container">
          <input
            id={id}
            name={inpName}
            defaultChecked
            type="radio"
            onClick={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
      {checkable && (
        <div className="checkbox-container shower-chekbox-container">
          <input
            id={id}
            name={inpName}
            defaultChecked
            type="checkbox"
            onChange={checkHandler}
            className="Interior-checkbox"
          />
        </div>
      )}
      <div className="shower-img-container">
        <img src={src} alt={`${label} ${id}`} />
      </div>
    </div>
  );
};

export default Shower;

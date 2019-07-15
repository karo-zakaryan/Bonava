import React, { useState, useEffect } from "react";

const Tile = ({
  id,
  inpName,
  label1,
  label2,
  label3,
  color1,
  color2,
  itemNum,
  checkable,
  checkHandler,
  tile,
  rbtn
}) => {
  const [variantValue, setvariantValue] = useState(`Вариант ${id}`);
  const [isEdit, setisEdit] = useState(false);
  const src = require(`../../../assets/images/bona${itemNum}.jpg`);

  useEffect(() => {
    setvariantValue(variantValue);
  }, [id, variantValue]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setvariantValue(target.value);
  };

  return (
    <div className="Tile-items" key={id} data-id={id}>
      <div>
        <div className="tile-variant flex-column d-flex align-items-center">
          {!isEdit ? (
            <p>{variantValue}</p>
          ) : (
            <input
              value={variantValue}
              onChange={changeHandler}
              className="tile_inp"
            />
          )}
          <button onClick={editHandler} className="editBtn">
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
        <div className="tile-item">
          <div style={{ backgroundColor: color1 }} className="tile-bg" />
          <p>{label1}</p>
        </div>

        <div className="tile-item">
          <div style={{ backgroundColor: color2 }} className="tile-bg" />
          <p>{label2}</p>
        </div>

        <div className="tile-item">
          <div className="tiles-c">
            <img src={src} alt={itemNum} />
          </div>
          <p>{label3}</p>
        </div>

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
          <div className="checkbox-container">
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
      </div>
    </div>
  );
};

export default Tile;

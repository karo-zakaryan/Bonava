import React, { useState, useEffect } from "react";
// import { FaPlus } from "react-icons/fa";

const Laminate = ({
  id,
  inpName,
  thumbnail,
  value,
  label2,
  checkable,
  checkDisable,
  isChRbtn,
  checkHandler,
  isCheck,
  rbtn
}) => {
  const [laminValue, setlaminValue] = useState(value);
  const [isEdit, setisEdit] = useState(false);

  // const src1 = require(`../../../assets/images/laminate${id}.jpg`);
  // const src2 = require(`../../../assets/images/lc${id}.jpg`);

  useEffect(() => {
    setlaminValue(value);
  }, [value]);

  const editHandler = () => {
    !isEdit ? setisEdit(true) : setisEdit(false);
  };

  const changeHandler = ({ target }) => {
    setlaminValue(target.value);
  };

  return (
    <div className="Interior-item laminate" key={id} data-id={id}>
      <div className="lm-item">
        <div className="f-item">
          <div className="lm-img">
            <img src={thumbnail.image} alt={`${id}`} />
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
              <input
                id={id}
                name={inpName}
                checked={isCheck}
                disabled={checkDisable}
                type="checkbox"
                onChange={checkHandler}
                className="Laminate-checkbox"
              />
            )}
          </div>

          {!isEdit ? (
            <p>{laminValue}</p>
          ) : (
            <input
              value={laminValue}
              onChange={changeHandler}
              className="tile_inp lam-inp"
            />
          )}
          <button onClick={editHandler} className="editBtn">
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
        {/* <FaPlus color="#013B2C" /> */}
        {/*<div className="s-item">*/}
        {/*  /!* <img src={src2} alt={`${id}`} /> *!/*/}
        {/*  <p>{label2}</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Laminate;

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SettingsItem = ({ label, labelContent, labelName }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inpLabValue, setInpLabValue] = useState(labelContent);
  const changeHandler = ({ target }) => setInpLabValue(target.value);

  return (
    <div className="Settings_item">
      <div className="Settings_item_f">
        <div className="Settings_sub_item_f">
          <b>{label}</b>
        </div>
        <div className="Settings_sub_item_s">
          {!isEdit ? (
            <p>{inpLabValue}</p>
          ) : (
            <Form.Control
              type="text"
              value={inpLabValue}
              onChange={changeHandler}
            />
          )}
        </div>
      </div>
      <div className="Settings_item_s">
        {!isEdit ? (
          <Button onClick={() => setIsEdit(true)} variant="link">
            Редактировать
          </Button>
        ) : (
          <Button onClick={() => setIsEdit(false)} variant="link">
            Сохранить
          </Button>
        )}
      </div>
    </div>
  );
};

export default SettingsItem;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import API from "../../../api";
import { Modal, Button, FormControl, Alert } from "react-bootstrap";
import setPackData from "../../../store/actions/setPackData/setPackData";
import "./PackageSettings.css";

const PackageSettings = ({ show, handleClose, node, setPackData }) => {
  const [price, setPrice] = useState(node.price);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setPrice(node.price);
  }, [node]);

  const changeHandler = ({ target }) => {
    const { value } = target;

    setPrice(Number(value));
    setIsValid(Number(value) < 0 || !Number(value));
  };

  const saveHandler = () => {
    if (node.price !== Number(price)) {
      rePricePackageHandler(node.id, node.name, Number(price));
    }
    handleClose();
  };

  const rePricePackageHandler = async (package_id, name, price) => {
    try {
      const {
        data: { data }
      } = await API.patch(`packages/${package_id}`, {
        name,
        price
      });
      setPackData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="m-header">
        <Modal.Title>{node.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="money-desc">Цена за 1 м2:</p>
        <FormControl
          onChange={changeHandler}
          value={price}
          // type="number"
          min="0"
        />
        <div className="message-container">
          {isValid && (
            <Alert variant="danger">Пожалуйста, введите верный ввод</Alert>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="m-footer">
        <Button
          variant="outline-success"
          className="close-btn"
          onClick={handleClose}
        >
          Отмена
        </Button>
        <Button
          variant="success"
          disabled={isValid}
          className="save-btn"
          onClick={saveHandler}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ tree }) => ({
  // node: tree.node
});

export default connect(
  mapStateToProps,
  { setPackData }
)(PackageSettings);

import React from "react";
import { Modal } from "react-bootstrap";
import Upload from "../Upload/Upload";

const uploadModal = ({ show, handleClose }) => (
  <Modal
    size="lg"
    dialogClassName="modal-90w"
    centered
    show={show}
    onHide={() => null}
    aria-labelledby="example-custom-modal-styling-title"
    // aria-labelledby="contained-modal-title-vcenter"
  >
    <Modal.Header className="m-header">
      <Modal.Title>Загрузить визуализацию</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Upload onClick={handleClose} />
    </Modal.Body>
  </Modal>
);

export default uploadModal;

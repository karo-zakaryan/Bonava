import React, { useState } from "react";
import { connect } from "react-redux";

import { Image, Form, Row, Col } from "react-bootstrap";
import Dropzone from "../Dropzone/Dropzone";
import Progress from "../Progress/Progress";

import setStyleData from "../../../store/actions/setStyleData/setStyleData";
import setCurrStyle from "../../../store/actions/setCurrStyle/setCurrStyle";

import "./Upload.css";

const Upload = ({
  setUploadedFile,
  setStyleData,
  setCurrStyle,
  id,
  onClick
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);

  const onFilesAdded = newFiles => {
    setFiles(files.concat(newFiles));
  };

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploading(true);
    const promises = [];

    files.forEach(file => {
      promises.push(sendRequest(file.obj, file.url, file));
    });

    try {
      await Promise.all(promises);

      setUploading(false);
      setSuccessfullUploaded(true);
    } catch (e) {
      setUploading(false);
      setSuccessfullUploaded(true);
    }
  };

  const sendRequest = (file, url, fileData) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = uploadProgress;
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };

          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = uploadProgress;
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
        resolve(url);
      });

      req.upload.addEventListener("error", event => {
        const copy = uploadProgress;
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);

        reject(req.response);
      });

      const formData = new FormData();

      formData.append("image", file, file.name);
      formData.append("room_reference_id", fileData.roomDetails.id);
      req.open("POST", `http://bonava.kilonewton.ru/api/styles/${id}/image`);
      req.responseType = "json";

      req.send(formData);

      req.onload = () => {
        const { data } = req.response;
        setCurrStyle(data);
        setStyleData(data);
      };
    });
  };

  const renderProgress = file => {
    const upProgress = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={upProgress ? upProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src={
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0%0D%0APSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0%0D%0ASDBWMHptMCAwaDI0djI0SDBWMHoiLz48cGF0aCBkPSJNMTYuNTkgNy41OEwxMCAxNC4xN2wtMy41%0D%0AOS0zLjU4TDUgMTJsNSA1IDgtOHpNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAx%0D%0AMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41%0D%0AOC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDh6Ii8+PC9zdmc+"
            }
            style={{
              opacity: upProgress && upProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  };

  const renderActions = () => {
    if (successfullUploaded) {
      onClick({}, false);
    } else {
      const roomDetArr = files.map(f => f.roomDetails);
      const isRoomDets = roomDetArr.filter(r => r === undefined);
      const disabled = !(!files.length || uploading) && !isRoomDets.length;

      return (
        <>
          <button className="Upload--btn" onClick={() => onClick({}, false)}>
            Отмена
          </button>

          <button
            className="Upload--btn"
            disabled={!disabled}
            onClick={uploadFiles}
          >
            Загрузить
          </button>
        </>
      );
    }
  };

  const radioBtnChangeHandler = ({ target }) => {
    const valInfo = target.id.split(".");
    const resFiles = files.map((file, index) => {
      if (index === Number(target.name)) {
        return {
          ...file,
          roomDetails: { id: Number(valInfo[1]), name: valInfo[0] }
        };
      }
      return file;
    });

    setFiles(resFiles);
  };

  return (
    <div className="Upload">
      <div className="Content">
        <div>
          <Dropzone
            onFilesAdded={onFilesAdded}
            disabled={uploading || successfullUploaded}
          />
        </div>
        <div className="Files">
          {files.map((file, index) => {
            return (
              <div className="File-item" key={index}>
                <div key={index} className="Row">
                  <Image className="uploaded_img" src={file.url} rounded />
                  {renderProgress(file.obj)}
                </div>
                <Form.Group as={Row} onChange={radioBtnChangeHandler}>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="Спальня"
                      id={`Спальня.1.${index}`}
                      name={index}
                    />
                    <Form.Check
                      type="radio"
                      label="Ванная комната"
                      id={`Ванная комната.2.${index}`}
                      name={index}
                    />
                    <Form.Check
                      type="radio"
                      label="Кухня"
                      id={`Кухня.3.${index}`}
                      name={index}
                    />
                    <Form.Check
                      type="radio"
                      label="Туалет"
                      id={`Туалет.4.${index}`}
                      name={index}
                    />
                    <Form.Check
                      type="radio"
                      label="Гостиная"
                      id={`Гостиная.5.${index}`}
                      name={index}
                    />
                    <Form.Check
                      type="radio"
                      label="Балкон"
                      id={`Балкон.6.${index}`}
                      name={index}
                    />
                  </Col>
                </Form.Group>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Actions">{renderActions()}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.type.currentStyle.id
});

export default connect(
  mapStateToProps,
  { setStyleData, setCurrStyle }
)(Upload);

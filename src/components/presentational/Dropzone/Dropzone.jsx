import React, { useState, useRef } from "react";
import "./Dropzone.css";

const Dropzone = ({ disabled, onFilesAdded }) => {
  const [hightlight, setHightlight] = useState(false);
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const onFilesAdd = evt => {
    if (disabled) return;
    const files = evt.target.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
  };

  const onDragOver = event => {
    event.preventDefault();
    if (disabled) return;
    setHightlight(true);
  };

  const onDragLeave = event => {
    setHightlight(false);
  };

  const onDrop = event => {
    event.preventDefault();
    if (disabled) return;
    const files = event.dataTransfer.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
    setHightlight(false);
  };

  const fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push({ obj: list.item(i), url: URL.createObjectURL(list.item(i)) });
    }
    return array;
  };

  return (
    <div
      className={`Dropzone ${hightlight ? "Highlight" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAdd}
      />
      <img
        alt="upload"
        className="Icon"
        src={
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0%0D%0APSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJu%0D%0Ab25lIi8+PHBhdGggZD0iTTE5LjM1IDEwLjA0QzE4LjY3IDYuNTkgMTUuNjQgNCAxMiA0IDkuMTEg%0D%0ANCA2LjYgNS42NCA1LjM1IDguMDQgMi4zNCA4LjM2IDAgMTAuOTEgMCAxNGMwIDMuMzEgMi42OSA2%0D%0AIDYgNmgxM2MyLjc2IDAgNS0yLjI0IDUtNSAwLTIuNjQtMi4wNS00Ljc4LTQuNjUtNC45NnpNMTQg%0D%0AMTN2NGgtNHYtNEg3bDUtNSA1IDVoLTN6Ii8+PC9zdmc+"
        }
      />
      <span>Загрузить файлы</span>
    </div>
  );
};

export default Dropzone;

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import setCurrRequisition from "../../../store/actions/setCurrRequisition/setCurrRequisition";

const ProjectCard = ({
  history,
  setCurrRequisition,
  unit,
  title,
  area,
  rooms,
  price,
  salePrice,
  floor,
  availableFacing
}) => {
  return (
    <div className="Project_item">
      <div className="Project_item_f">
        <div className="Project_item_title">
          <FaCircle color="rgb(79, 226, 193)" size={21} />
          {title}
        </div>
        <div>
          <IoMdBusiness size={35} />
        </div>
      </div>
      <div className="Projects_item_s">
        <div className="Project_item_info">
          <div>
            <p className="Project_item_data_label">Площадь</p>
            <p className="Project_item_data">
              {`${area} м`}
              <sup>2</sup>
            </p>
          </div>

          <div>
            <p className="Project_item_data_label">Спальни</p>
            <p className="Project_item_data">{rooms}</p>
          </div>
          <div>
            <p className="Project_item_data_label">Цена</p>
            <p className="Project_item_data">{`${price}  ₽`}</p>
          </div>
          <div>
            <p className="Project_item_data_label">Со скидкой*</p>
            <p className="Project_item_data">{`${salePrice}  ₽`}</p>
          </div>
          <div>
            <p className="Project_item_data_label">Этаж</p>
            <p className="Project_item_data">{floor}</p>
          </div>
          <div>
            <p className="Project_item_data_label">Доступная отделка</p>
            <p className="Project_item_data">{availableFacing}</p>
          </div>
        </div>
        <div>
          <div
            className="Project_item_next"
            onClick={() => {
              setCurrRequisition(unit);
              history.push("/user/packages");
            }}
          >
            <MdNavigateNext color="#fff" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { setCurrRequisition }
)(withRouter(ProjectCard));

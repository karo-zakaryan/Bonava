import React from "react";
import { FaCircle } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

const RequistionCard = ({
  name,
  email,
  phone,
  packageName,
  styleName,
  date,
  title,
  area,
  rooms,
  price,
  salePrice,
  nextClick,
  floor
}) => {
  return (
    <div className="Project_item">
      <div className="Project_item_f">
        <div className="Project_item_title_cont">
          <div className="Project_item_title">
            <FaCircle color="rgb(79, 226, 193)" size={21} />
            {title}
          </div>
          <div className="Project_item_title other_title">{name}</div>
          <div className="Project_item_title other_title">{email}</div>{" "}
          <div className="Project_item_title other_title">{phone}</div>
        </div>

        <div>
          <IoMdBusiness size={35} />
        </div>
      </div>
      <div className="Projects_item_s">
        <div className="info_cont">
          <div className="Project_item_info first_info_cont">
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
          </div>
          <div className="Project_item_info second_info_cont">
            <div>
              <p className="Project_item_data_label">Пакет отделки</p>
              <p className="Project_item_data">{packageName}</p>
            </div>
            <div>
              <p className="Project_item_data_label">Стиль отделки</p>
              <p className="Project_item_data">{styleName}</p>
            </div>
            <div>
              <p className="Project_item_data_label">Дата</p>
              <p className="Project_item_data">{date}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="Project_item_next" onClick={nextClick}>
            <MdNavigateNext color="#fff" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequistionCard;

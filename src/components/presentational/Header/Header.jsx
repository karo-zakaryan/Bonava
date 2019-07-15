import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navbar, NavDropdown, Spinner } from "react-bootstrap";
import { IoIosHome } from "react-icons/io";

// import { paths } from "../../../constants/paths";
import setUserRole from "../../../store/actions/setUserRole/setUserRole";
import { logout } from "../../../store/actions/auth/auth";

import logo from "../../../assets/logo.png";
import "./Header.css";

const header = ({ isUser, setUserRole, history, logout, user }) => {
  const { bonavaToken } = localStorage;
  // const demoHandler = () => {
  //   const path = !isUser ? paths.user : paths.admin;
  //
  //   setUserRole(!isUser);
  //   history.push(path);
  //   isUser && window.location.reload();
  // };

  const logoutHandler = () => {
    window.location.reload();

    logout();
  };

  return (
    <Navbar expand="lg" className="admin__navbar-container">
      <div className="logo" onClick={() => history.push("/")}>
        <img src={logo} alt="img" className="logo_img" />
      </div>
      <div className="right_nav">
        <Navbar.Brand>
          {bonavaToken && !isUser ? "Администрирование." : ""} Калькулятор
          отделки
        </Navbar.Brand>
        {bonavaToken && (
          <div className="d-flex align-items-end brand_cont">
            {/*}<Button size="sm" variant="success" onClick={demoHandler}>
              {isUser ? "USER" : "ADMIN"} DEMO
            </Button>*/}

            <NavDropdown
              className="dropdown_title"
              title={
                user ? (
                  user.firstname
                ) : (
                  <Spinner animation="grow" variant="success" />
                )
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => history.push("/admin/data")}>
                Админ панель
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => history.push("/admin/apartments")}>
                Квартиры
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => history.push("/admin/userRequisition")}
              >
                Заявки
              </NavDropdown.Item>
              {/*<NavDropdown.Item onClick={() => history.push("/user/packages")}>*/}
              {/*  User демо*/}
              {/*</NavDropdown.Item>*/}
              <NavDropdown.Item onClick={() => history.push("/settings")}>
                Настройки
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand>Моя Bonava</Navbar.Brand>
            <IoIosHome color="#4fe2c1" size={30} />
          </div>
        )}
      </div>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    isUser: state.auth.isUser,
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setUserRole, logout }
  )(header)
);

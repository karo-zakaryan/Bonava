import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Card, Button } from "react-bootstrap";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

import "../Login/Login.css";

const PasswordRecovery = ({ login, isAuthenticated }) => {
  const [isValid, setIsValid] = useState(false);
  const [passType, setPassType] = useState("password");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // const { email, password } = formData;

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    setIsValid(true);
  };

  return (
    <Container className="Login-full-page">
      <div className="Login-card-container">
        <Card className="Login-card">
          <div className="Login-title-container">
            <h4>Выберите новый пароль</h4>
          </div>
          <Form noValidate validated={isValid} onSubmit={onSubmit}>
            <Form.Group className="Login-form" controlId="formBasicEmail">
              <Form.Label className="Login-label">E-mail (логин)</Form.Label>
              <Form.Control
                className="Login-input"
                type="email"
                name="email"
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="Login-form" controlId="formBasicPassword">
              <Form.Label className="Login-label">Пароль</Form.Label>
              <div className="pass_input_container">
                <Form.Control
                  className="Login-input Login-input-password"
                  type={passType}
                  name="password"
                  onChange={onChange}
                  required
                />
                {passType === "text" ? (
                  <IoIosEyeOff
                    onClick={() => setPassType("password")}
                    size={25}
                  />
                ) : (
                  <IoIosEye onClick={() => setPassType("text")} size={25} />
                )}
              </div>
            </Form.Group>

            <Button className="Login-button" variant="primary" type="submit">
              Сбросить
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PasswordRecovery);

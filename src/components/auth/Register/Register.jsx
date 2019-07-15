import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Form, Card, Button } from "react-bootstrap";
import { register } from "../../../store/actions/auth/auth";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import VerifyMessage from "../../presentational/VerifyMessage/VerifyMessage";
import "../Login/Login.css";
import "./Register.css";

const Register = ({ register, history }) => {
  const [passType, setPassType] = useState("password");
  const [isValid, setIsValid] = useState(false);
  const [isConfirmMsg, setIsConfirmMsg] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const { email, password, firstName, lastName, phoneNumber } = formData;

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    setIsValid(true);
    register({ email, password, firstName, lastName, phoneNumber });
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setIsConfirmMsg(true);
    }
  };

  return (
    <Container className="Login-full-page">
      <div className="Login-card-container">
        <Card className="Login-card">
          {!isConfirmMsg ? (
            <>
              <div className="Login-title-container">
                <h4>Создать новый аккаунт</h4>
              </div>
              <Form noValidate validated={isValid} onSubmit={onSubmit}>
                <div className="inline_input_container">
                  <Form.Group className="Login-form" controlId="formName">
                    <Form.Label className="Login-label">Имя</Form.Label>
                    <Form.Control
                      className="Login-input"
                      type="text"
                      name="firstName"
                      onChange={onChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="Login-form"
                    controlId="formBasicPassword"
                  >
                    <Form.Label className="Login-label">Фамилия</Form.Label>
                    <Form.Control
                      className="Login-input"
                      type="text"
                      name="lastName"
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="inline_input_container">
                  <Form.Group className="Login-form" controlId="formPhoneEmail">
                    <Form.Label className="Login-label">
                      Номер телефона
                    </Form.Label>
                    <Form.Control
                      className="Login-input"
                      type="tel"
                      pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
                      name="phoneNumber"
                      onChange={onChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="Login-form" controlId="formBasicEmail">
                    <Form.Label className="Login-label">
                      E-mail (логин)
                    </Form.Label>
                    <Form.Control
                      className="Login-input"
                      type="email"
                      name="email"
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="inline_input_container">
                  <Form.Group className="Login-form" controlId="formPassword">
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
                        <IoIosEye
                          onClick={() => setPassType("text")}
                          size={25}
                        />
                      )}
                    </div>
                  </Form.Group>
                </div>

                <div className="inline_input_container">
                  <div>
                    <Form.Text className="text-muted info_txt">
                      Нажумая на кнопку "Регистрация", вы даете свое согласие на
                      получение рекламных материалов по e-mail, телефону и
                      смс(если вы указали свой номер телефона).В любое время вы
                      можете отписаться, отправив сообщение на этот адрес
                      e-mail.Подробная информация о способах обработки и защиты
                      персональных данных доступна по ссылке.
                    </Form.Text>
                  </div>
                  <div className="reg_btn_container">
                    <Button
                      className="Login-button"
                      variant="primary"
                      type="submit"
                    >
                      Регистрация
                    </Button>
                    <Form.Text className="text-muted Login-helper-text Login-ask-txt">
                      <p>Уже есть аккаунт?</p>
                      <Link to="/login">Войти</Link>
                    </Form.Text>
                  </div>
                </div>
              </Form>
            </>
          ) : (
            <VerifyMessage
              messageTitle="Подтверждение отправлено"
              topMessage="Мы отправили письмо с подтверждением доступа на Ваш e-mail.
          Пожалуйста, подтвердите адрес электронной почты для защиты Вашей
          учетной записи."
            >
              Если Вы не получили письмо, проверьте папку "Спам", или{" "}
              <Link to="/register" onClick={() => console.log("Resend")}>
                отправьте подтверждающее письмо еще раз.
              </Link>
              Если письмо было отправлено на неправильный адрес, просто{" "}
              <Link
                to="/register"
                onClick={() => {
                  setIsValid(false);
                  setIsConfirmMsg(false);
                  setPassType("password");
                  setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    password: ""
                  });
                }}
              >
                вернитесь к регистрации.
              </Link>
            </VerifyMessage>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default connect(
  null,
  { register }
)(Register);

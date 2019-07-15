import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Form, Card, Button } from "react-bootstrap";
import { login } from "../../../store/actions/auth/auth";
import { MdLockOutline } from "react-icons/md";
import VerifyMessage from "../../presentational/VerifyMessage/VerifyMessage";

import "../Login/Login.css";
import "./Recovery.css";

const Recovery = ({ login }) => {
  const [isValid, setIsValid] = useState(false);
  const [isConfirmMsg, setIsConfirmMsg] = useState(false);

  const [formData, setFormData] = useState({
    email: ""
  });

  //   const { email } = formData;

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      setIsConfirmMsg(true);
    }
    setIsValid(true);
    // login(email);
  };

  return (
    <Container className="Login-full-page">
      <div className="Login-card-container">
        <Card className="Login-card recovery_card">
          {!isConfirmMsg ? (
            <>
              <div>
                <MdLockOutline size={60} color="#69C4B0" />
              </div>
              <div className="Login-title-container recovery_title">
                <h4>Введите зарегистрированый адрес e-mail</h4>
              </div>
              <Form noValidate validated={isValid} onSubmit={onSubmit}>
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

                <Button
                  className="Login-button"
                  variant="primary"
                  type="submit"
                >
                  Отправить
                </Button>
                {/*<Form.Text className="text-muted Login-helper-text Login-ask-txt">
              <p>Не забыли пароль?</p>
              <Link to="/login">Логин</Link>
            </Form.Text>*/}
              </Form>
            </>
          ) : (
            <VerifyMessage
              titleStyle={{
                maxWidth: 328,
                margin: "0 auto"
              }}
              messageTitle="Ссылка для сброса пароля была отправлена на Ваш e-mail"
              topMessage="Мы отправили письмо для восстановления пароля на Ваш e-mail.
          Пожалуйста, следуйте инструкциям в письме для восстановления пароля."
            >
              Если Вы не получили письмо, проверьте папку "Спам", или{" "}
              <Link to="/login" onClick={() => console.log("Resend")}>
                отправьте подтверждающее письмо еще раз.
              </Link>
              Если письмо было отправлено на неправильный адрес, просто{" "}
              <Link
                to="/recovery"
                onClick={() => {
                  setIsValid(false);
                  setIsConfirmMsg(false);
                  setFormData({
                    email: ""
                  });
                }}
              >
                сбросьте снова.
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
  { login }
)(Recovery);

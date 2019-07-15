import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Form, Card, Button } from "react-bootstrap";
import { login } from "../../../store/actions/auth/auth";

import "./Login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    login(email, password);
  };

  return (
    <Container className="Login-full-page">
      <div className="Login-card-container">
        <Card className="Login-card">
          <div className="Login-title-container">
            <h4>Использовать учетную запись</h4>
          </div>
          <Form onSubmit={onSubmit}>
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
              <Form.Control
                className="Login-input"
                type="password"
                name="password"
                onChange={onChange}
                required
              />
              <Form.Text className="text-muted Login-helper-text">
                <p>Забыли пароль?</p>
                <Link to="/recovery">Сбросить</Link>
              </Form.Text>
            </Form.Group>

            <Button className="Login-button" variant="primary" type="submit">
              Войти
            </Button>
            <Form.Text className="text-muted Login-helper-text Login-ask-txt">
              <p>Ещё не зарегистрированы?</p>
              <Link to="/register">Регистрация</Link>
            </Form.Text>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);

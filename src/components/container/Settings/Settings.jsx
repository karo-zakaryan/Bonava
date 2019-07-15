import React from "react";
import { connect } from "react-redux";
import { Container, Card, Spinner } from "react-bootstrap";
import SettingsItem from "../../presentational/SettingsItem/SettingsItem";
import "./Settings.css";

const Settings = ({ user }) => {
  const itemsObj = {
    Имя: user ? user.firstname : "",
    Фамилия: user ? user.lastname : "",
    "Контактный e-mail": user ? user.email : "",
    "Номер телефона": user ? user.phone : "",
    "E-mail (логин)": user ? user.email : ""
  };

  return (
    <Container className="Settings-full-page">
      <div className="Settings-card-container">
        <Card className="Settings-card">
          <div className="Settings-title-container">
            <h4>Настройки</h4>
          </div>
          <div className="Settings-paragraph-container">
            <p>Профиль</p>
          </div>
          <div className="Settings-items-container">
            {user ? (
              Object.keys(itemsObj).map((key, index) => {
                return (
                  <SettingsItem
                    key={index}
                    label={key}
                    labelContent={itemsObj[key]}
                    labelName={key}
                  />
                );
              })
            ) : (
              <Spinner animation="border" variant="success" />
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Settings);

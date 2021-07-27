import { Button, Form, Input } from "antd";
// import { useRouter } from "next/router";
import React from "react";
import useAuth from "../auth/AuthContext";

const login = () => {
  const { login } = useAuth();
  const onFinish = async (data: any) => {
    login(data.email, data.password);
  };
  return (
    <div className="loginContainer">
      <Form onFinish={onFinish} className="form__container">
        <h1 className="main-title">Iniciar sesión</h1>
        <span className="form__label">Email:</span>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor introduce tu e-mail",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <span className="form__label">Contraseña:</span>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Por favor introduce tu contraseña!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
      <div className="login__info">
        <p className="login__text">Bases de Datos 2021 - 1</p>
        <div className="login__author">
          <p>De Castro Moreno Juliana Catalina</p>
          <p>Sanchez Ortiz Sergio Alejandro</p>
          <p>Sarmiento Torres Johan Stiven</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(login);

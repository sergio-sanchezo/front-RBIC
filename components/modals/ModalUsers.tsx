import { Cascader, Form, Input, InputNumber, Button, message } from "antd";
import React from "react";
import { fetchConToken } from "../../helpers/fetch";

const optionsCascader = [
  {
    value: "admin",
    label: "Administrador",
  },
  {
    value: "visitante",
    label: "Visitante",
  },
];

const ModalUsers = ({ getUsr }: any) => {
  const onFinish = async (data: any) => {
    const resp = await fetchConToken("user", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
      getUsr();
    }
  };
  return (
    <Form onFinish={onFinish}>
      <h2>Crear usuario</h2>
      <span>Nombre:</span>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Por favor introduce un nombre",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Apellido:</span>
      <Form.Item
        name="lastname"
        rules={[
          {
            required: true,
            message: "Por favor introduce un apellido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Email:</span>
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
      <span>Contraseña:</span>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Por favor introduce una contraseña",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Rol:</span>
      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: "Por favor selecciona un rol",
          },
        ]}
      >
        <Cascader options={optionsCascader} placeholder="Selecciona el rol" />
      </Form.Item>
      <p>Documento:</p>
      <Form.Item
        name="document"
        rules={[
          {
            required: true,
            message: "Por favor introduce un documento",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ModalUsers);

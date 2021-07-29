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

const ModalUsersEdit = (record: any) => {
  const id = record.record.usr_document;
  const onFinish = async (data: any) => {
    const isNull = Object.values(data).every(
      (o) => o === null || o === undefined
    );
    if (isNull) {
      return message.info("No se ha introducido información");
    }
    if (data.usr_role) {
      data.usr_role = data.usr_role[0];
    }
    data.id = id;
    const resp = await fetchConToken("user", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
    }
  };
  return (
    <Form onFinish={onFinish}>
      <h2>Editar usuario</h2>
      <span>Nombre:</span>
      <Form.Item name="usr_name">
        <Input />
      </Form.Item>
      <span>Apellido:</span>
      <Form.Item name="usr_lastname">
        <Input />
      </Form.Item>
      <span>Email:</span>
      <Form.Item
        name="usr_email"
        rules={[
          {
            type: "email",
            message: "Introduce un email válido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Contraseña:</span>
      <Form.Item name="usr_password">
        <Input />
      </Form.Item>
      <span>Rol:</span>
      <Form.Item name="usr_role">
        <Cascader options={optionsCascader} placeholder="Selecciona el rol" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ModalUsersEdit);

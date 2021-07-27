import { Button, DatePicker, Form, Input, message } from "antd";
import React from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRP = () => {
  const onFinish = async (data: any) => {
    data.createdDate = data.createdDate.format("YYYY-MM-DD");
    const resp = await fetchConToken("referencePoint", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
    }
  };
  return (
    <Form onFinish={onFinish}>
      <h2>Crear punto de referencia</h2>
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
      <span>Fecha de creación:</span>
      <Form.Item
        name="createdDate"
        rules={[
          {
            required: true,
            message: "Por favor introduce una fecha",
          },
        ]}
      >
        <DatePicker placeholder="Fecha" />
      </Form.Item>
      <span>Descripción:</span>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: "Por favor introduce una descripción",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Ubicación:</span>
      <Form.Item
        name="location"
        rules={[
          {
            required: true,
            message: "Por favor introduce una ubicación",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Resumen:</span>
      <Form.Item
        name="summary"
        rules={[
          {
            required: true,
            message: "Por favor introduce un resumen",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalRP;

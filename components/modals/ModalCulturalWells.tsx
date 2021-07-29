import { Button, Form, Input, DatePicker, Cascader, message } from "antd";
import React, { useState } from "react";
// import moment from "moment";
import { useEffect } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalCulturalWells = ({ getCw }: any) => {
  const onFinish = async (data: any) => {
    data.createdDate = data.createdDate.format("YYYY-MM-DD");
    const resp = await fetchConToken("culturalWell", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
      getCw();
    }
  };

  return (
    <Form onFinish={onFinish}>
      <h2>Crear bien de interés cultural</h2>
      <span>Dirección:</span>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Por favor introduce una dirección",
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
      <span>Director:</span>
      <Form.Item
        name="director"
        rules={[
          {
            required: true,
            message: "Por favor introduce un director",
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
            message: "Por favor introduce un email",
          },
        ]}
      >
        <Input />
      </Form.Item>
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
      <span>Teléfono:</span>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Por favor introduce un teléfono",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <span>Web:</span>
      <Form.Item
        name="website"
        rules={[
          {
            required: true,
            message: "Por favor introduce una web",
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

export default React.memo(ModalCulturalWells);

import { Button, Form, Input, DatePicker, Cascader, message } from "antd";
import React, { useState } from "react";
// import moment from "moment";
import { useEffect } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalCulturalWells = () => {
  const [referencePoints, setReferencePoints] = useState([]);
  const onFinish = async (data: any) => {
    data.createdDate = data.createdDate.format("YYYY-MM-DD");
    const resp = await fetchConToken("culturalWell", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
    }
  };
  const getData = async () => {
    const resp = await fetchConToken("referencePoint");
    const body = await resp.json();
    const cascaderOpt = body.results.map((e: any) => {
      return { value: e.rfp_id, label: e.rfp_name };
    });
    setReferencePoints(cascaderOpt);
  };
  useEffect(() => {
    getData();
  }, []);
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
      <span>Punto de referencia:</span>
      <Form.Item
        name="referencePoint"
        rules={[
          {
            required: true,
            message: "Por favor selecciona un punto de referencia",
          },
        ]}
      >
        <Cascader
          options={referencePoints}
          placeholder="Puntos de referencia"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalCulturalWells;

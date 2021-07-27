import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRPS = () => {
  const [referencePoints, setReferencePoints] = useState([]);
  const onFinish = async (data: any) => {
    // console.log(data);
    const resp = await fetchConToken("referencePointSection", data, "POST");
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
      <h2>Crear punto de referencia sección</h2>
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
      <span>Link imagen:</span>
      <Form.Item
        name="image"
        rules={[
          {
            required: true,
            message: "Por favor introduce un link",
          },
        ]}
      >
        <Input />
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

export default ModalRPS;

import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalAuthors = () => {
  const [referencePoints, setReferencePoints] = useState([]);
  const onFinish = async (data: any) => {
    const resp = await fetchConToken("author", data, "POST");
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
      <h2>Crear autor</h2>
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

export default ModalAuthors;

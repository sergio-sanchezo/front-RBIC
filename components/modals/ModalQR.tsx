import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalQR = () => {
  const [culturalWells, setCulturalWells] = useState([]);
  const onFinish = async (data: any) => {
    const resp = await fetchConToken("qr", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
    }
  };
  const getData = async () => {
    const resp = await fetchConToken("culturalWell");
    const body = await resp.json();
    const cascaderOpt = body.results.map((e: any) => {
      return { value: e.ctw_id, label: e.ctw_name };
    });
    // console.log(cascaderOpt);
    setCulturalWells(cascaderOpt);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Form onFinish={onFinish}>
      <h2>Crear QR</h2>
      <span>Imagen:</span>
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
      <span>Bien de interés cultural:</span>
      <Form.Item
        name="culturalWell"
        rules={[
          {
            required: true,
            message: "Por favor selecciona un bien de interés cultural",
          },
        ]}
      >
        <Cascader
          options={culturalWells}
          placeholder="Bien de interés cultural"
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

export default ModalQR;

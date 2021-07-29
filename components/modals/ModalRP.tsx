import { Button, Cascader, DatePicker, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRP = ({ getRp }: any) => {
  const [culturalWells, setCulturalwells] = useState([]);
  const onFinish = async (data: any) => {
    data.createdDate = data.createdDate.format("YYYY-MM-DD");
    const resp = await fetchConToken("referencePoint", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
      getRp();
    }
  };
  const getData = async () => {
    const resp = await fetchConToken("culturalWell");
    const body = await resp.json();
    const cascaderOptions = body.results.map((e: any) => {
      return { value: e.ctw_id, label: e.ctw_name };
    });
    setCulturalwells(cascaderOptions);
  };

  useEffect(() => {
    getData();
  }, []);
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

export default React.memo(ModalRP);

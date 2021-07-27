import { Button, DatePicker, Form, Input, message } from "antd";
import React from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRPEdit = (record: any) => {
  const id = record.record.rfp_id;
  const onFinish = async (data: any) => {
    if (data.createdDate) {
      data.createdDate = data.createdDate.format("YYYY-MM-DD");
    }
    data.id = id;
    const resp = await fetchConToken("referencePoint", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
    }
  };
  return (
    <Form onFinish={onFinish}>
      <h2>Editar punto de referencia</h2>
      <span>Nombre:</span>
      <Form.Item name="rfp_name">
        <Input />
      </Form.Item>
      <span>Fecha de creación:</span>
      <Form.Item name="rfp_createdDate">
        <DatePicker placeholder="Fecha" />
      </Form.Item>
      <span>Descripción:</span>
      <Form.Item name="rfp_description">
        <Input />
      </Form.Item>
      <span>Ubicación:</span>
      <Form.Item name="rfp_location">
        <Input />
      </Form.Item>
      <span>Resumen:</span>
      <Form.Item name="rfp_summary">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalRPEdit;

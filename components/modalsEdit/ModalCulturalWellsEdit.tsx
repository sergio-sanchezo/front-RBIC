import { Button, Form, Input, DatePicker, Cascader, message } from "antd";
import React, { useState } from "react";
// import moment from "moment";
import { useEffect } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalCulturalWellsEdit = (record: any) => {
  const id = record.record.ctw_id;
  const onFinish = async (data: any) => {
    const isNull = Object.values(data).every(
      (o) => o === null || o === undefined
    );
    if (isNull) {
      return message.info("No se ha introducido información");
    }
    if (data.createdDate) {
      data.createdDate = data.createdDate.format("YYYY-MM-DD");
    }
    if (data.ctw_referencePoint) {
      data.referencePoint = data.ctw_referencePoint[0];
    }
    data.id = id;
    const resp = await fetchConToken("culturalWell", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
    }
  };

  return (
    <Form onFinish={onFinish}>
      <h2>Editar bien de interés cultural</h2>
      <span>Dirección:</span>
      <Form.Item name="ctw_address">
        <Input />
      </Form.Item>
      <span>Fecha de creación:</span>
      <Form.Item name="ctw_createdDate">
        <DatePicker placeholder="Fecha" />
      </Form.Item>
      <span>Director:</span>
      <Form.Item name="ctw_director">
        <Input />
      </Form.Item>
      <span>Email:</span>
      <Form.Item name="ctw_email">
        <Input />
      </Form.Item>
      <span>Nombre:</span>
      <Form.Item name="ctw_name">
        <Input />
      </Form.Item>
      <span>Teléfono:</span>
      <Form.Item name="ctw_phone">
        <Input />
      </Form.Item>
      <span>Web:</span>
      <Form.Item name="ctw_website">
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

export default React.memo(ModalCulturalWellsEdit);

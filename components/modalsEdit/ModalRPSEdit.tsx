import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRPSEdit = (record: any) => {
  const id = record.record.rps_id;
  const [referencePoints, setReferencePoints] = useState([]);
  const onFinish = async (data: any) => {
    if (data.rps_referencePoint) {
      data.referencePoint = data.rps_referencePoint[0];
    }
    data.id = id;
    const resp = await fetchConToken("referencePointSection", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
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
      <h2>Editar punto de referencia sección</h2>
      <span>Nombre:</span>
      <Form.Item name="rps_name">
        <Input />
      </Form.Item>
      <span>Link imagen:</span>
      <Form.Item name="rps_image">
        <Input />
      </Form.Item>
      <span>Descripción:</span>
      <Form.Item name="rps_description">
        <Input />
      </Form.Item>
      <span>Punto de referencia:</span>
      <Form.Item name="rps_referencePoint">
        <Cascader
          options={referencePoints}
          placeholder="Puntos de referencia"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalRPSEdit;

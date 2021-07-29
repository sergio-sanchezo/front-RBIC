import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalAuthorsEdit = (record: any) => {
  const id = record.record.aut_id;
  const [referencePoints, setReferencePoints] = useState([]);
  const onFinish = async (data: any) => {
    const isNull = Object.values(data).every(
      (o) => o === null || o === undefined
    );
    if (isNull) {
      return message.info("No se ha introducido información");
    }
    data.id = id;
    const resp = await fetchConToken("author", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
    }
  };
  const getData = async () => {
    const resp = await fetchConToken("referencePoint");
    const body = await resp.json();
    const cascaderOptions = body.results.map((e: any) => {
      return { value: e.rfp_id, label: e.rfp_name };
    });
    setReferencePoints(cascaderOptions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form onFinish={onFinish}>
      <h2>Editar autor</h2>
      <span>Nombre:</span>
      <Form.Item name="aut_name">
        <Input />
      </Form.Item>
      <span>Apellido:</span>
      <Form.Item name="aut_lastname">
        <Input />
      </Form.Item>
      <span>Punto de referencia:</span>
      <Form.Item name="aut_referencePoint">
        <Cascader options={referencePoints} placeholder="Punto de referencia" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ModalAuthorsEdit);

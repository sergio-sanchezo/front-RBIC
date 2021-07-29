import { Button, Cascader, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalQREdit = (record: any) => {
  const id = record.record.qr_id;
  const [culturalWells, setCulturalWells] = useState([]);
  const onFinish = async (data: any) => {
    const isNull = Object.values(data).every(
      (o) => o === null || o === undefined
    );
    if (isNull) {
      return message.info("No se ha introducido información");
    }
    if (data.qr_culturalWell) {
      data.culturalWell = data.qr_culturalWell[0];
    }
    data.id = id;
    const resp = await fetchConToken("qr", data, "PUT");
    const body = await resp.json();
    if (body.ok) {
      message.success("Editado con éxito");
    }
  };
  const getData = async () => {
    const resp = await fetchConToken("culturalWell");
    const body = await resp.json();
    const cascaderOpt = body.results.map((e: any) => {
      return { value: e.ctw_id, label: e.ctw_name };
    });
    setCulturalWells(cascaderOpt);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Form onFinish={onFinish}>
      <h2>Editar QR</h2>
      <span>Imagen:</span>
      <Form.Item name="qr_image">
        <Input />
      </Form.Item>
      <span>Bien de interés cultural:</span>
      <Form.Item name="qr_culturalWell">
        <Cascader
          options={culturalWells}
          placeholder="Bien de interés cultural"
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

export default React.memo(ModalQREdit);

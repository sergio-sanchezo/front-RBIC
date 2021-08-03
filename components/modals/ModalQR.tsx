import { Button, Cascader, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalQR = ({ getQRs }: any) => {
  const [culturalWells, setCulturalWells] = useState([]);
  const onFinish = async (data: any) => {
    const resp = await fetchConToken("qr", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Creado con éxito");
      getQRs();
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
      <h2>Generar QR</h2>
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
          Generar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ModalQR);

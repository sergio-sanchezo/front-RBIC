import { Button, Cascader, DatePicker, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";

const ModalRPEdit = (record: any) => {
  const [culturalWells, setCulturalwells] = useState([]);
  const id = record.record.rfp_id;
  const onFinish = async (data: any) => {
    const isNull = Object.values(data).every(
      (o) => o === null || o === undefined || o === ""
    );
    if (isNull) {
      return message.info("No se ha introducido información");
    }
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
      <span>Bien de interés cultural:</span>
      <Form.Item name="rfp_culturalWell">
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

export default React.memo(ModalRPEdit);

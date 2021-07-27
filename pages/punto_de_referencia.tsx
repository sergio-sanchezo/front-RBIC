import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalRP from "../components/modals/ModalRP";
import ModalRPEdit from "../components/modalsEdit/ModalRPEdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "ID",
    dataIndex: "rfp_id",
    key: "rfp_id",
  },
  {
    title: "Nombre",
    dataIndex: "rfp_name",
    key: "rfp_name",
  },
  {
    title: "Fecha de creación",
    dataIndex: "rfp_createdDate",
    key: "rfp_createdDate",
  },
  {
    title: "Descripción",
    dataIndex: "rfp_description",
    key: "rfp_description",
  },
  {
    title: "Ubicación",
    dataIndex: "rfp_location",
    key: "rfp_location",
  },
  {
    title: "Resumen",
    dataIndex: "rfp_summary",
    key: "rfp_summary",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update
          record={record}
          endpoint="referencePoint"
          content={<ModalRPEdit record={record} />}
        />
        <Delete record={record} endpoint="referencePoint" />
      </>
    ),
  },
];

const PuntoDeReferencia = () => {
  const [referencePoint, setReferencePoint] = useState([]);
  const getRp = async () => {
    const resp = await fetchConToken("referencePoint");
    const body = await resp.json();

    setReferencePoint(body.results);
  };

  useEffect(() => {
    getRp();
  }, []);
  return (
    <MainLayout title="Punto de Referencia" selectedKey={["1"]}>
      <>
        <h1 className="main-title">Punto de Referencia</h1>
        <Create
          text="punto de referencia"
          endpoint="referencePoint"
          content={<ModalRP />}
        />
        <Table dataSource={referencePoint} columns={columns} />
      </>
    </MainLayout>
  );
};

export default React.memo(PuntoDeReferencia);

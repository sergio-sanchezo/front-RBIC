import { Pagination, Table } from "antd";
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
    title: "Bien de interés cultural",
    dataIndex: "rfp_culturalWell",
    key: "rfp_culturalWell",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalRPEdit record={record} />} />
        <Delete record={record} endpoint="referencePoint" />
      </>
    ),
  },
];

const PuntoDeReferencia = () => {
  const [referencePoint, setReferencePoint] = useState([]);
  const [amountRP, setAmountRP] = useState<number>();
  const getRp = async () => {
    const resp = await fetchConToken("referencePoint/view");
    const body = await resp.json();

    setReferencePoint(body.results);
  };

  const getAmountRp = async () => {
    const resp = await fetchConToken("referencePoint/total");
    const body = await resp.json();
    setAmountRP(body.amount);
  };

  useEffect(() => {
    getRp();
    getAmountRp();
  }, []);
  return (
    <MainLayout title="Punto de Referencia" selectedKey={["2"]}>
      <>
        <h1 className="main-title">Punto de Referencia</h1>
        <Create
          text="punto de referencia"
          endpoint="referencePoint"
          content={<ModalRP getRp={getRp} />}
        />
        <Table
          dataSource={referencePoint}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(PuntoDeReferencia);

import { Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalCulturalWells from "../components/modals/ModalCulturalWells";
import ModalCulturalWellsEdit from "../components/modalsEdit/ModalCulturalWellsEdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Dirección",
    dataIndex: "ctw_address",
    key: "ctw_address",
  },
  {
    title: "Fecha de creación",
    dataIndex: "ctw_createdDate",
    key: "ctw_createdDate",
  },
  {
    title: "Director",
    dataIndex: "ctw_director",
    key: "ctw_director",
  },
  {
    title: "Email",
    dataIndex: "ctw_email",
    key: "ctw_email",
  },
  {
    title: "Nombre",
    dataIndex: "ctw_name",
    key: "ctw_name",
  },
  {
    title: "Télefono",
    dataIndex: "ctw_phone",
    key: "ctw_phone",
  },
  {
    title: "Web",
    dataIndex: "ctw_webSite",
    key: "ctw_webSite",
  },
  {
    title: "Punto de referencia",
    dataIndex: "ctw_referencePoint",
    key: "ctw_referencePoint",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update
          record={record}
          endpoint="culturalWell"
          content={<ModalCulturalWellsEdit record={record} />}
        />
        <Delete record={record} endpoint="culturalWell" />
      </>
    ),
  },
];

const BienDeInteres = () => {
  const [culturalWells, setCulturalWells] = useState([]);
  const getCulturalWells = async () => {
    const resp = await fetchConToken("culturalWell");
    const body = await resp.json();
    setCulturalWells(body.results);
  };
  // console.log(culturalWells);
  useEffect(() => {
    getCulturalWells();
  }, []);

  return (
    <MainLayout title="Bien de interés cultural" selectedKey={["2"]}>
      <>
        <h1 className="main-title">Bien de interés cultural</h1>
        <Create
          text="bien de interés cultural"
          endpoint="culturalWell"
          content={<ModalCulturalWells />}
        />
        <Table dataSource={culturalWells} columns={columns} />
      </>
    </MainLayout>
  );
};

export default React.memo(BienDeInteres);

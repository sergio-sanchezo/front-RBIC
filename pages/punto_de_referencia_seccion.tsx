import { Image, Table } from "antd";
import React, { useEffect, useState } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalRPS from "../components/modals/ModalRPS";
import ModalRPSEdit from "../components/modalsEdit/ModalRPSEdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Nombre",
    dataIndex: "rps_name",
    key: "rps_name",
  },
  {
    title: "Imagen - Link",
    dataIndex: "rps_image",
    key: "rps_image",
    render: (_: any, image: any) => (
      <Image src={image.rps_image} width={150} alt={image.rps_image} />
    ),
  },
  {
    title: "Descripción",
    dataIndex: "rps_description",
    key: "rps_description",
  },
  {
    title: "Punto de referencia",
    dataIndex: "rps_referencePoint",
    key: "rps_referencePoint",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalRPSEdit record={record} />} />
        <Delete record={record} endpoint="referencePointSection" />
      </>
    ),
  },
];

const PuntoDeReferenciaSeccion = () => {
  const [referencePointSection, setReferencePointSection] = useState([]);
  const getRps = async () => {
    const resp = await fetchConToken("referencePointSection/view");
    const body = await resp.json();
    setReferencePointSection(body.results);
  };

  useEffect(() => {
    getRps();
  }, []);
  return (
    <MainLayout title="Punto de referencia sección" selectedKey={["3"]}>
      <>
        <h1 className="main-title">Punto de referencia sección</h1>
        <Create
          text="punto de referencia sección"
          endpoint="referencePointSection"
          content={<ModalRPS getRps={getRps} />}
        />
        <Table
          dataSource={referencePointSection}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(PuntoDeReferenciaSeccion);

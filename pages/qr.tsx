import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalQR from "../components/modals/ModalQR";
import ModalQREdit from "../components/modalsEdit/ModalQREdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Imagen",
    dataIndex: "qr_image",
    key: "qr_image",
  },
  {
    title: "Bien de interés cultural",
    dataIndex: "qr_culturalWell",
    key: "qr_culturalWell",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalQREdit record={record} />} />
        <Delete record={record} endpoint="qr" />
      </>
    ),
  },
];

const QR = () => {
  const [QR, setQR] = useState([]);
  const getQRs = async () => {
    const resp = await fetchConToken("qr/view");
    const body = await resp.json();
    setQR(body.results);
  };
  // console.log(QR);
  useEffect(() => {
    getQRs();
  }, []);
  return (
    <MainLayout title="QR" selectedKey={["5"]}>
      <>
        <h1 className="main-title">QR</h1>
        <Create text="QR" endpoint="qr" content={<ModalQR getQRs={getQRs} />} />
        <Table
          dataSource={QR}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(QR);

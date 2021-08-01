import { Table } from "antd";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Punto de referencia",
    dataIndex: "vst_referencePointSection",
    key: "vst_referencePointSection",
  },
  {
    title: "Usuario",
    dataIndex: "vst_user",
    key: "vst_user",
  },
  {
    title: "Fecha",
    dataIndex: "vst_arriveDate",
    key: "vst_arriveDate",
  },
];

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const getAuthors = async () => {
    const resp = await fetchConToken("visit/view");
    const body = await resp.json();
    setVisits(body.results);
  };
  useEffect(() => {
    getAuthors();
  }, []);
  return (
    <MainLayout title="Visitas" selectedKey={["7"]}>
      <>
        <h1 className="main-title">Visitas</h1>
        <Table
          dataSource={visits}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(Visits);

import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalAuthors from "../components/modals/ModalAuthors";
import ModalAuthorsEdit from "../components/modalsEdit/ModalAuthorsEdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Nombre",
    dataIndex: "aut_name",
    key: "aut_name",
  },
  {
    title: "Apellido",
    dataIndex: "aut_lastname",
    key: "aut_lastname",
  },
  {
    title: "Punto de referencia",
    dataIndex: "aut_referencePoint",
    key: "aut_referencePoint",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalAuthorsEdit record={record} />} />
        <Delete record={record} endpoint="author" />
      </>
    ),
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const getAuthors = async () => {
    const resp = await fetchConToken("author/view");
    const body = await resp.json();
    setAuthors(body.results);
  };
  useEffect(() => {
    getAuthors();
  }, []);
  return (
    <MainLayout title="Autores" selectedKey={["6"]}>
      <>
        <h1 className="main-title">Autores</h1>
        <Create
          text="autor"
          endpoint="author"
          content={<ModalAuthors getAuts={getAuthors} />}
        />
        <Table
          dataSource={authors}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(Authors);

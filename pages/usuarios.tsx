import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Create from "../components/crud/Create";
import Delete from "../components/crud/Delete";
import Update from "../components/crud/Update";
import MainLayout from "../components/layout/MainLayout";
import ModalUsers from "../components/modals/ModalUsers";
import ModalUsersEdit from "../components/modalsEdit/ModalUsersEdit";
import { fetchConToken } from "../helpers/fetch";

const columns = [
  {
    title: "Nombre",
    dataIndex: "usr_name",
    key: "usr_name",
  },
  {
    title: "Apellido",
    dataIndex: "usr_lastname",
    key: "usr_lastname",
  },
  {
    title: "Email",
    dataIndex: "usr_email",
    key: "usr_email",
  },
  {
    title: "Rol",
    dataIndex: "usr_role",
    key: "usr_role",
  },
  {
    title: "Documento",
    dataIndex: "usr_document",
    key: "usr_document",
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalUsersEdit record={record} />} />
        <Delete record={record} endpoint="user" />
      </>
    ),
  },
];

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const resp = await fetchConToken("user");
    const body = await resp.json();
    setUsers(body.results);
  };
  // console.log(users);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <MainLayout title="Usuarios" selectedKey={["4"]}>
      <>
        <h1 className="main-title">Usuarios</h1>
        <Create
          text="usuario"
          endpoint="user"
          content={<ModalUsers getUsr={getUsers} />}
        />
        <Table
          dataSource={users}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
      </>
    </MainLayout>
  );
};

export default React.memo(Usuarios);

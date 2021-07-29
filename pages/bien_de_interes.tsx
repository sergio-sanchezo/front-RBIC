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
    title: "Acciones",
    key: "action",
    render: (_: any, record: any) => (
      <>
        <Update content={<ModalCulturalWellsEdit record={record} />} />
        <Delete record={record} endpoint="culturalWell" />
      </>
    ),
  },
];

const BienDeInteres = () => {
  const [culturalWells, setCulturalWells] = useState([]);
  const [extraRp, setExtraRp] = useState([]);
  const [extraQR, setExtraQR] = useState([]);
  const getCulturalWells = async () => {
    const resp = await fetchConToken("culturalWell");
    const body = await resp.json();
    setCulturalWells(body.results);
  };
  const getExtraInfoRp = async () => {
    const resp = await fetchConToken("culturalWell/groupedRp");
    const body = await resp.json();
    setExtraRp(body.results);
  };

  const getExtraInfoQR = async () => {
    const resp = await fetchConToken("culturalWell/groupedQR");
    const body = await resp.json();
    setExtraQR(body.results);
  };
  useEffect(() => {
    getCulturalWells();
    getExtraInfoRp();
    getExtraInfoQR();
  }, []);
  return (
    <MainLayout title="Bien de interés cultural" selectedKey={["1"]}>
      <>
        <h1 className="main-title">Bien de interés cultural</h1>
        <Create
          text="bien de interés cultural"
          endpoint="culturalWell"
          content={<ModalCulturalWells getCw={getCulturalWells} />}
        />
        <Table
          dataSource={culturalWells}
          columns={columns}
          pagination={{ defaultPageSize: 4 }}
        />
        {extraRp.length > 0 && (
          <>
            <h2 className="sub-title">Información - Puntos de referencia</h2>
            <div className="extraInfo">
              <p className="text">
                Cantidad de puntos de referencia por bien de interés cultural
              </p>
              <div className="extraInfo__container">
                <p className="extra-title one">Bien de interés cultural</p>
                <p className="extra-title two">
                  Cantidad de puntos de referencia
                </p>
                {extraRp.map((e: any, i: any) => (
                  <>
                    <p className="one">{e.ctw}</p>
                    <p className="two">{e.amount}</p>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
        {extraQR.length > 0 && (
          <>
            <h2 className="sub-title mt-35">Información - QR</h2>
            <div className="extraInfo">
              <p className="text">
                Cantidad de códigos QR por bien de interés cultural
              </p>
              <div className="extraInfo__container">
                <p className="extra-title one">Bien de interés cultural</p>
                <p className="extra-title two">Cantidad de códigos QR</p>
                {extraQR.map((e: any, i: any) => (
                  <>
                    <p className="one">{e.ctw}</p>
                    <p className="two">{e.amount}</p>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    </MainLayout>
  );
};

export default React.memo(BienDeInteres);

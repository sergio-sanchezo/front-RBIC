import React, { useEffect, useState } from "react";
import { fetchConToken } from "../helpers/fetch";

const VisitantView = () => {
  const [referencePoints, setReferencePoints] = useState([]);
  const getReferencePoints = async () => {
    const resp = await fetchConToken("referencePoint");
    const body = await resp.json();
    setReferencePoints(body.results);
  };
  useEffect(() => {
    getReferencePoints();
  }, []);

  return (
    <div className="view_container">
      <div className="viewHeader">
        <p>Bases de datos 2021 - 1</p>
        <p>Visitante</p>
        <p>Universidad Nacional de Colombia</p>
      </div>
      <div className="content">
        <h1 className="main-title">Puntos de referencia</h1>
        <div className="cardContainer">
          {referencePoints.map((e: any, i: any) => (
            <div key={i} className="reference-card">
              <h2 className="card-subt">{e.rfp_name}</h2>
              <p className="card-descript">{e.rfp_description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitantView;

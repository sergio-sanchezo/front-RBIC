import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import { fetchConToken } from "../../helpers/fetch";

interface DeleteProps {
  record: any;
  endpoint: any;
}

const Delete = ({ record, endpoint }: DeleteProps) => {
  const onDelete = async (record: any, endpoint: any) => {
    const resp = await fetchConToken(endpoint, record, "DELETE");
    const body = await resp.json();
    if (body.ok) {
      message.warning("Eliminado con éxito");
    }
  };
  return (
    <Tooltip placement="top" title="Borrar">
      <DeleteOutlined
        className="action-btn"
        onClick={() => onDelete(record, endpoint)}
      />
    </Tooltip>
  );
};

export default Delete;

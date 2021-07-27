import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Tooltip, Modal } from "antd";

const Update = ({
  record,
  endpoint,
  content,
}: {
  record: any;
  endpoint: any;
  content: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalState = (state: boolean) => {
    setShowModal(state);
  };
  // console.log(record);
  return (
    <>
      <Tooltip placement="top" title="Editar">
        <EditFilled className="action-btn" onClick={() => modalState(true)} />
      </Tooltip>
      <Modal
        footer={null}
        visible={showModal}
        onCancel={() => modalState(false)}
      >
        {content}
      </Modal>
    </>
  );
};

export default Update;
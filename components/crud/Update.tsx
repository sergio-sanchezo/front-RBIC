import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Tooltip, Modal } from "antd";

const Update = ({ content }: { content: any }) => {
  const [showModal, setShowModal] = useState(false);
  const modalState = (state: boolean) => {
    setShowModal(state);
  };
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

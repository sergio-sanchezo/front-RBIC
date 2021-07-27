import { Button, Modal } from "antd";
import React, { useState } from "react";

interface createProps {
  text: string;
  endpoint: string;
  content: JSX.Element;
}

const Create = ({ text, endpoint, content }: createProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalState = (state: boolean) => {
    setShowModal(state);
  };

  return (
    <>
      <Button className="btn-create" onClick={() => modalState(true)}>
        Crear {text}
      </Button>
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

export default Create;

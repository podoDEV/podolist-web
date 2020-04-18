import React from "react";
import Dialog from "components/Dialog";
import Modal from "components/Modal";

export default {
  title: "Dialog"
};

export const dialog = () => {
  return (
    <Modal>
      <Dialog />
    </Modal>
  );
};

dialog.story = {
  name: "default"
};

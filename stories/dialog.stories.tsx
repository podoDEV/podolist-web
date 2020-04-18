import React from "react";
import { Dialog, DialogTitle, DialogContents } from "components/Dialog";
import Modal from "components/Modal";

export default {
  title: "Dialog"
};

export const dialog = () => {
  return (
    <Modal>
      <Dialog>
        <DialogTitle>타이틀</DialogTitle>
        <DialogContents>컨텐츠</DialogContents>
      </Dialog>
    </Modal>
  );
};

dialog.story = {
  name: "default"
};

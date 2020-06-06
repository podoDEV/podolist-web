import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContents, DialogButtonGroups } from "components/Dialog";
import Modal from "components/Modal";

export default {
  title: "Dialog"
};

export const dialog = () => {
  const [open, setOpen] = useState(true);
  return (
    <Modal open={true}>
      <Dialog>
        <DialogTitle>타이틀</DialogTitle>
        <DialogContents>컨텐츠</DialogContents>
        <DialogButtonGroups>
          <button>취소</button>
          <button>확인</button>
        </DialogButtonGroups>
      </Dialog>
    </Modal>
  );
};

dialog.story = {
  name: "default"
};

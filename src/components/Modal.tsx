import React, { ReactNode, useEffect } from "react";
/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { createPortal } from "react-dom";

const fullscreen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const dimmed = css`
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
`;

type ModalProps = {
  children: ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export default function Modal({ children }: ModalProps) {
  const modalChild = document.createElement("div");
  useEffect(() => {
    modalRoot?.appendChild(modalChild);
    return () => {
      modalRoot?.removeChild(modalChild);
    };
  }, []);

  return createPortal(<div css={[fullscreen, dimmed]}>{children}</div>, modalChild);
}

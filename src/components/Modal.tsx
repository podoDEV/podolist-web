import React, { ReactNode, Children } from "react";
/**@jsx jsx */
import { jsx, css } from "@emotion/core";

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

export default function Modal({ children }: ModalProps) {
  return <div css={[fullscreen, dimmed]}>{children}</div>;
}

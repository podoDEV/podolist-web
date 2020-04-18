import React, { ReactNode } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Color } from "constants/Color";

const DialogBoxWrapper = styled.div`
  z-index: 20;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogBox = styled.div`
  box-sizing: border-box;
  border-radius: 0.25rem;
  min-width: 25rem;
  background: #fff;
  padding: 2.5rem;
`;

type DialogProps = {
  children: ReactNode;
};

function Dialog({ children }: DialogProps) {
  return (
    <DialogBoxWrapper>
      <DialogBox>{children}</DialogBox>
    </DialogBoxWrapper>
  );
}

const DialogTitle = styled.h3`
  font-size: 1.5rem;
  color: #000;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const DialogContents = styled.p`
  font-size: 1.125rem;
  margin: 0;
  color: ${Color.LIGHT_GRAY};
`;

export { Dialog, DialogTitle, DialogContents };

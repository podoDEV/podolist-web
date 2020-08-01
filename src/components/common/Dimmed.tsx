import React, { HTMLAttributes } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

// @TODO: 타입 추가 후 eslint-disable 제거 필요
// eslint-disable-next-line
interface DimmedProps extends HTMLAttributes<HTMLDivElement> {}

export default function Dimmed({ ...props }: DimmedProps) {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.18);
      `}
      {...props}
    />
  );
}

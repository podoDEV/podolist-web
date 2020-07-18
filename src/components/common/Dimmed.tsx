import React, { HTMLAttributes } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

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

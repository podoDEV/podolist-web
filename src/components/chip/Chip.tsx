import React, { HTMLProps } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Color } from "constants/Color";

export interface ChipProps extends HTMLProps<HTMLDivElement> {
  label?: string;
}

export default function Chip({ label, ...props }: ChipProps) {
  return (
    <div
      css={css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 38px;
        font-size: 0.875rem;
        background: ${Color.GRAY_500};
        border: 1px solid ${Color.GRAY_500};
        color: ${Color.WHITE};
        border-radius: 1rem;
        padding: 0 0.375rem;
      `}
      {...props}
    >
      <div>{label}</div>
    </div>
  );
}

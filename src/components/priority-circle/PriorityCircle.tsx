import React, { ReactNode, HTMLProps } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PriorityType } from "constants/Priority";
import { PriorityColor } from "constants/Color";

interface PriorityCircleProps extends HTMLProps<HTMLDivElement> {
  priority: PriorityType;
}

export default function PriorityCircle({ priority, ...props }: PriorityCircleProps) {
  return (
    <div
      css={css`
        width: 18px;
        height: 18px;
        border-radius: 100%;
        border: 2px solid ${PriorityColor[priority]};
      `}
      {...props}
    />
  );
}

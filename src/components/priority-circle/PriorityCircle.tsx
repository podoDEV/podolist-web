import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PriorityType } from "constants/Priority";
import { PriorityColor } from "constants/Color";

interface PriorityCircleProps {
  priority: PriorityType;
}

export default function PriorityCircle({ priority }: PriorityCircleProps) {
  return (
    <div
      css={css`
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background-color: ${PriorityColor[priority]};
      `}
    />
  );
}

import React, { ReactNode } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Chip, { ChipProps } from "../chip/Chip";
import { PriorityType } from "constants/Priority";
import { PriorityColor, Color } from "constants/Color";
import clsx from "clsx";

interface PriorityChipProps extends ChipProps {
  priority: PriorityType;
  active?: boolean;
}

export default function PriorityChip({ priority, active, ...props }: PriorityChipProps) {
  return (
    <Chip
      css={css`
        &.${priority} {
          &.${active && "active"} {
            background-color: ${PriorityColor[priority]};
          }
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        color: ${Color.WHITE};
        border: none;
        width: 5.3125rem;
        height: 2.375rem;
        cursor: pointer;
      `}
      className={clsx(`${priority}`, { active })}
      {...props}
    />
  );
}

import React, { ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PriorityType } from "constants/Priority";
import PriorityChip from "components/todo-adder/PriorityChip";

const PRIORITY_LABEL_INFO = [
  {
    label: "!!!!!",
    value: PriorityType.URGENT
  },
  {
    label: "!!!",
    value: PriorityType.HIGH
  },
  {
    label: "!",
    value: PriorityType.MEDIUM
  },
  {
    label: "~",
    value: PriorityType.LOW
  },
  {
    label: "-",
    value: PriorityType.NONE
  }
];

interface PriorityRadioGroupProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkedPriority: PriorityType;
}

export default function PriorityRadioGroup({ onChange, checkedPriority }: PriorityRadioGroupProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        > *:not(:last-child) {
          margin-right: 5px;
        }
      `}
    >
      {PRIORITY_LABEL_INFO.map(priority => {
        const isChecked = checkedPriority === (priority.value as PriorityType);
        return (
          <div
            css={css`
              flex: 1 1 0px;
            `}
            key={priority.label + priority.value}
          >
            <Radio
              label={
                <PriorityChip priority={priority.value} active={isChecked} label={priority.label} />
              }
              value={priority.value}
              onChange={onChange}
              checked={isChecked}
            />
          </div>
        );
      })}
    </div>
  );
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "label"> {
  label: ReactNode;
}

function Radio({ label, ...props }: RadioProps) {
  return (
    <label
      css={css`
        position: relative;
      `}
    >
      {label}
      <input
        css={css`
          position: absolute;
          opacity: 0;
          top: 0;
          left: 0;
          width: 0;
          z-index: 1;
        `}
        type="radio"
        {...props}
      />
    </label>
  );
}

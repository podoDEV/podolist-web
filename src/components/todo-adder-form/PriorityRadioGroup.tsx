import React, { ReactNode, useState, InputHTMLAttributes } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PriorityType } from "constants/Priority";
import PriorityChip from "components/todo-adder-form/PriorityChip";

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
  onChange: (value: PriorityType) => void;
  defaultChecked?: PriorityType;
}

export default function PriorityRadioGroup({
  onChange,
  defaultChecked: defaultCheckedPriority = PriorityType.MEDIUM
}: PriorityRadioGroupProps) {
  const [checkedPriority, setCheckedPriority] = useState<PriorityType>(defaultCheckedPriority);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      {PRIORITY_LABEL_INFO.map(priority => {
        const isChecked = checkedPriority === (priority.value as PriorityType);
        return (
          <Radio
            key={priority.label + priority.value}
            label={
              <PriorityChip priority={priority.value} active={isChecked} label={priority.label} />
            }
            value={priority.value}
            onChange={event => {
              const value = event.target.value as PriorityType;
              setCheckedPriority(value);
              onChange(value);
            }}
            checked={isChecked}
          />
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

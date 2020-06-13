/** @jsx jsx */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "static/img/add-btn.png";
import EnterIcon from "static/img/enter.png";
import Calendar from "components/calendar/calendar";
import dayjs from "dayjs";
import Chip from "components/chip/Chip";
import { PriorityType } from "constants/Priority";
import PriorityCircle from "components/priority-circle/PriorityCircle";
import PriorityRadioGroup from "./PriorityRadioGroup";

const FormsContainer = styled("form")`
  display: flex;
  flex-direction: column;
  max-width: 562px;
  min-height: 70px;
  border-radius: 22px 22px 0 0;
  background: rgba(244, 244, 244);
  padding: 3px;
`;

const InputContainer = styled("div")`
  display: flex;
  border-radius: 44px;
  background: rgb(255, 255, 255);
  width: 100%;
  height: 44px;
`;

const OpenFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: url(${AddIcon}) 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const AddFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: rgb(158, 48, 254) url(${EnterIcon}) 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const ContentsInput = styled("input")`
  width: calc(100% - 88px);
  border: none;
`;

const PRIORITY_CHIPS = [
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

interface TodoAdderFormProps {
  defaultOpenOptions: boolean;
}

export default function TodoAdderForm({ defaultOpenOptions }: TodoAdderFormProps) {
  const [date, setDate] = useState(dayjs());

  const { register, handleSubmit, watch, errors } = useForm();
  const [isOpenOptions, setIsOpenOptions] = useState(defaultOpenOptions);

  const onSubmit = data => {
    console.log(data, "data");
  };

  const handleClickOpenFormBtn = () => {
    setIsOpenOptions(true);
  };

  const handleChangePriority = (value: PriorityType) => {
    console.log(value);
  };

  return (
    <FormsContainer onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <OpenFormsBtn onClick={handleClickOpenFormBtn} />
        {/* {isOpenOptions && <PriorityCircle priority={} />} */}
        <ContentsInput name="contents" ref={register} />
        <AddFormsBtn />
      </InputContainer>
      {isOpenOptions && (
        <div
          css={css`
            padding: 0 1rem;
          `}
        >
          <div>
            <div>중요도 설정</div>
            <PriorityRadioGroup onChange={handleChangePriority} />
          </div>
          <div>
            <div>날짜</div>
            <Calendar date={date} setDate={setDate} />
          </div>
        </div>
      )}
    </FormsContainer>
  );
}

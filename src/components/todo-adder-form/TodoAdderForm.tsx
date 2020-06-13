/** @jsx jsx */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import Calendar from "components/calendar/calendar";
import dayjs from "dayjs";
import { PriorityType } from "constants/Priority";
import PriorityCircle from "components/priority-circle/PriorityCircle";
import PriorityRadioGroup from "./PriorityRadioGroup";
import { Color } from "constants/Color";

const Label = styled.label`
  display: block;
  color: ${Color.PRIMARY};
  padding-bottom: 0.5rem;
`;

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
  align-items: center;
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
  background: url("/images/add-btn.png") 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const AddFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: rgb(158, 48, 254) url("/images/enter.png") 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const ContentsInput = styled("input")`
  width: calc(100% - 88px);
  border: none;
`;

const OptionsContainer = styled.div`
  padding: 1rem;
  > * :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

// TODO: API 붙이면 교체~
type FormStateType = {
  dueAt: number;
  endedAt: number;
  startedAt: number;
  priority: PriorityType;
  title: string;
};

type TodoAdderFormProps = {
  defaultOpenOptions: boolean;
  // TODO: API 붙일 떄 param 교체
  onSubmit: (params: any) => void;
};

export default function TodoAdderForm({ defaultOpenOptions, onSubmit }: TodoAdderFormProps) {
  const [formState, setFormState] = useState<FormStateType>({
    dueAt: 0,
    endedAt: 0,
    startedAt: 0,
    priority: PriorityType.MEDIUM,
    title: ""
  });
  const [date, setDate] = useState(dayjs());

  const [isOpenOptions, setIsOpenOptions] = useState(defaultOpenOptions);

  const handleClickOpenFormBtn = () => {
    setIsOpenOptions(true);
  };

  const handleChangePriority = (priority: PriorityType) => {
    setFormState({
      ...formState,
      priority
    });
  };

  return (
    <FormsContainer onSubmit={onSubmit}>
      <InputContainer>
        <OpenFormsBtn onClick={handleClickOpenFormBtn} />
        {isOpenOptions && <PriorityCircle priority={formState.priority} />}
        <ContentsInput />
        <AddFormsBtn />
      </InputContainer>
      {isOpenOptions && (
        <OptionsContainer>
          <div>
            <Label>중요도 설정</Label>
            <PriorityRadioGroup onChange={handleChangePriority} />
          </div>
          <div>
            <Label>날짜</Label>
            <Calendar date={date} setDate={setDate} />
          </div>
        </OptionsContainer>
      )}
    </FormsContainer>
  );
}

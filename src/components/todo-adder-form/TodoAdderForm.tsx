/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Calendar from "components/calendar/calendar";
import PriorityCircle from "components/priority-circle/PriorityCircle";
import { Color } from "constants/Color";
import { PriorityType } from "constants/Priority";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import PriorityRadioGroup from "./PriorityRadioGroup";

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
  font-size: 15px;
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
  defaultIsOpen?: boolean;
  // TODO: API 붙일 떄 param 교체
  onSubmit: () => void;
};

export default function TodoAdderForm({ defaultIsOpen, onSubmit }: TodoAdderFormProps) {
  const [formState, setFormState] = useState<FormStateType>({
    dueAt: 0,
    endedAt: 0,
    startedAt: 0,
    priority: PriorityType.MEDIUM,
    title: ""
  });
  const [date, setDate] = useState(dayjs());

  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const handleClickOpenFormBtn = () => {
    setIsOpen(!isOpen);
  };

  const handleChangePriority = (priority: PriorityType) => {
    setFormState({
      ...formState,
      priority
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <FormsContainer onSubmit={handleSubmit}>
      <InputContainer>
        <OpenFormsBtn onClick={handleClickOpenFormBtn} />
        {isOpen && <PriorityCircle priority={formState.priority} />}
        <ContentsInput />
        <AddFormsBtn />
      </InputContainer>
      {isOpen && (
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

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Calendar from "components/calendar/calendar";
import PriorityCircle from "components/priority-circle/PriorityCircle";
import { Color } from "constants/Color";
import { PriorityType } from "constants/Priority";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import PriorityRadioGroup from "./PriorityRadioGroup";
import Dimmed from "components/common/Dimmed";
import useOutsideClick from "hooks/useOutsideClick";
import { CreateTodoParams } from "./TodoAdder";
import { useImmer } from "use-immer";

const Label = styled.label`
  display: block;
  color: ${Color.PRIMARY};
  padding-bottom: 0.5rem;
`;

const FormsContainer = styled("form")`
  display: inline-flex;
  flex-direction: column;
  width: 562px;
  min-height: 70px;
  border-radius: 22px 22px 0 0;
  background: rgba(244, 244, 244);
  padding: 3px;
  .toast-enter {
    height: 0;
  }
  .toast-enter-active,
  .toast-enter-done {
    height: 500px;
    transition: height 0.3s;
  }
  .toast-exit {
    height: 500px;
  }
  .toast-exit-active {
    height: 0;
    transition: height 0.3s;
  }
`;

const InputContainer = styled("div")`
  display: flex;
  align-items: center;
  border-radius: 44px;
  background: rgb(255, 255, 255);
  width: 100%;
  height: 44px;
  transition: all 0.1s ease-in;
  &.close {
    transform: rotate(45deg);
  }
  &.open {
    transform: rotate(0);
  }
`;

const OpenFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: url("/images/add-btn.png") 50% 50%/ 16px 16px no-repeat;
  &.open {
    transform: rotate(0);
  }
  &.close {
    transform: rotate(45deg);
  }
  cursor: pointer;
  transition: rotate 0.1s;
`;

const AddFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: rgb(158, 48, 254) url("/images/enter.png") 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
  overflow: hidden;
`;

const ContentsInput = styled("input")`
  font-size: 15px;
  width: calc(100% - 88px);
  border: none;
`;

const OptionsContainer = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type FormStateType = Omit<CreateTodoParams, "dueAt" | "endedAt" | "startedAt"> & {
  startedAt: Dayjs;
};

type TodoAdderFormProps = {
  defaultIsOpen?: boolean;
  onSubmit: (params: FormStateType) => void;
};

export default function TodoAdderForm({ defaultIsOpen, onSubmit }: TodoAdderFormProps) {
  const [formState, produceFormState] = useImmer<FormStateType>({
    startedAt: dayjs(),
    priority: PriorityType.MEDIUM,
    title: ""
  });
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);

  const handleClickOpenFormBtn = () => {
    setIsOpen(!isOpen);
  };
  const handleChangePriority = (priority: PriorityType) => {
    produceFormState(draft => {
      draft.priority = priority;
    });
  };
  const setDate = (date: Dayjs) => {
    produceFormState(draft => {
      draft.startedAt = date;
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const formContainerRef = useRef<HTMLFormElement | null>(null);

  useOutsideClick(formContainerRef, () => {
    isOpen && setIsOpen(false);
  });

  return (
    <>
      {isOpen && (
        <Dimmed
          css={css`
            top: 65px;
          `}
        />
      )}
      <div
        css={css`
          width: 750px;
          position: fixed;
          bottom: 0;
        `}
      >
        <FormsContainer ref={formContainerRef} onSubmit={handleSubmit}>
          <InputContainer>
            <OpenFormsBtn
              type="button"
              className={isOpen ? "close" : "open"}
              onClick={handleClickOpenFormBtn}
            />
            {isOpen && (
              <PriorityCircle
                css={css`
                  margin-right: 8px;
                `}
                priority={formState.priority}
              />
            )}
            <ContentsInput
              onClick={() => setIsOpen(true)}
              onChange={event => {
                const { value } = event.target;
                produceFormState(draft => {
                  draft.title = value;
                });
              }}
            />
            <AddFormsBtn type="submit" />
          </InputContainer>
          <CSSTransition in={isOpen} timeout={300} classNames="toast" unmountOnExit>
            <OptionsContainer>
              {isOpen ? (
                <>
                  <div
                    css={css`
                      padding-top: 1rem;
                    `}
                  >
                    <Label>중요도 설정</Label>
                    <PriorityRadioGroup onChange={handleChangePriority} />
                  </div>
                  <div>
                    <Label>날짜</Label>
                    <Calendar date={formState.startedAt} setDate={setDate} />
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </OptionsContainer>
          </CSSTransition>
        </FormsContainer>
      </div>
    </>
  );
}

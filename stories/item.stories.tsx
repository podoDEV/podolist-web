import * as React from "react";
import TodoItem from "components/todoItem";
import styled from "@emotion/styled";

interface ContainerProps {
  width?: number;
}

const Container = styled.div<ContainerProps>(
  {
    border: "1px solid red",
    padding: 30
  },
  (props: ContainerProps) => ({
    width: props.width || 600
  })
);

export default {
  title: "Todo Item"
};
const onClickEdit = () => {
  alert("click edit");
};
export const priorityItem = () => {
  return (
    <Container>
      <TodoItem
        priority="urgent"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        onClickEdit={onClickEdit}
        id={1}
      />
      <TodoItem
        priority="high"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        onClickEdit={onClickEdit}
        id={2}
      />
      <TodoItem
        priority="medium"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        onClickEdit={onClickEdit}
        id={3}
      />
      <TodoItem
        priority="low"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        onClickEdit={onClickEdit}
        id={4}
      />
      <TodoItem
        priority="none"
        text="엔씨 소프트 자소서 쓰기"
        onClickEdit={onClickEdit}
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        id={5}
      />
    </Container>
  );
};

export const longTextItem = () => {
  return (
    <Container>
      <TodoItem
        onClickEdit={onClickEdit}
        priority="medium"
        text="기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트 기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트 기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트"
        date="2020.02.02"
        checked={false}
        selectedDate="2020.02.02"
        id={1}
      />
    </Container>
  );
};

export const finishedItem = () => {
  return (
    <Container>
      <TodoItem
        onClickEdit={onClickEdit}
        priority="medium"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={true}
        selectedDate="2020.02.02"
        id={1}
      />
    </Container>
  );
};

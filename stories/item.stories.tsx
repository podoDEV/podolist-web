import * as React from "react";
import TodoItem from "../src/components/todoItem";
import styled from "@emotion/styled";

interface ContainerProps {
  width?: number;
}

const Container = styled.div(
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

export const priorityItem = () => {
  return (
    <Container>
      <TodoItem
        priority="urgent"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
      />
      <TodoItem priority="high" text="엔씨 소프트 자소서 쓰기" date="2020.02.02" checked={false} />
      <TodoItem
        priority="medium"
        text="엔씨 소프트 자소서 쓰기"
        date="2020.02.02"
        checked={false}
      />
      <TodoItem priority="low" text="엔씨 소프트 자소서 쓰기" date="2020.02.02" checked={false} />
      <TodoItem priority="none" text="엔씨 소프트 자소서 쓰기" date="2020.02.02" checked={false} />
    </Container>
  );
};

export const longTextItem = () => {
  return (
    <Container>
      <TodoItem
        priority="medium"
        text="기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트 기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트 기이이이이이이이이이이이이이이이이이이이이이이이이인 텍스으으으으으으으으으트"
        date="2020.02.02"
        checked={false}
      />
    </Container>
  );
};

export const finishedItem = () => {
  return (
    <Container>
      <TodoItem priority="medium" text="엔씨 소프트 자소서 쓰기" date="2020.02.02" checked={true} />
    </Container>
  );
};

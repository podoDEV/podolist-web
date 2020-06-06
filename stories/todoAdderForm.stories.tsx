import * as React from "react";

import styled from "@emotion/styled";
import TodoAdderForm from "components/todo-adder-form/TodoAdderForm";

interface ContainerProps {
  width?: number;
}

const Container = styled.div(
  {
    border: "1px solid red",
    padding: 30
  },
  (props: ContainerProps) => ({
    width: props.width || 1200
  })
);

export default {
  title: "todoAdderForms"
};

export const notOpen = () => {
  return (
    <Container>
      <TodoAdderForm />
    </Container>
  );
};

export const open = () => {
  return (
    <Container>
      <TodoAdderForm />
    </Container>
  );
};

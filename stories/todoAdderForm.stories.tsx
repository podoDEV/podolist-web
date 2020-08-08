import styled from "@emotion/styled";
import TodoAdderForm from "components/todo-adder/TodoAdderForm";
import * as React from "react";

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
  // eslint-disable-next-line
  const handler = (params: any) => {};

  return <Container>{/*<TodoAdderForm onSubmit={handler} />*/}</Container>;
};

export const open = () => {
  return (
    <Container>
      {/*<TodoAdderForm defaultIsOpen={true} onSubmit={() => console.log("onsubmit")} />*/}
    </Container>
  );
};

import * as React from "react";
import Forms from "components/forms";
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
    width: props.width || 1200
  })
);

export default {
  title: "Forms"
};

export const notOpen = () => {
  return (
    <Container>
      <Forms />
    </Container>
  );
};

export const open = () => {
  return (
    <Container>
      <Forms />
    </Container>
  );
};

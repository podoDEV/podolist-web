import * as React from "react";
import Navigation from "../src/components/navigation";
import styled from "@emotion/styled";

interface ContainerProps {
  width?: number;
}

const Container = styled.div(
  {
    border: "1px solid red"
  },
  (props: ContainerProps) => ({
    width: props.width || "100%"
  })
);

export default {
  title: "Navigation"
};

export const priorityItem = () => {
  return (
    <Container>
      <Navigation />
    </Container>
  );
};

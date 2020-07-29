import styled from "@emotion/styled";
import PriorityRadioGroup from "components/todo-adder/PriorityRadioGroup";
import React from "react";
import { PriorityType } from "../src/constants/Priority";

export default {
  title: "PriorityRadio"
};

const Container = styled.div`
  width: 500px;
`;

export const priorityRadioGroup = () => {
  return (
    <Container>
      <PriorityRadioGroup
        onChange={priority => {
          console.log(priority);
        }}
        checkedPriority={"HIGH" as PriorityType}
      />
    </Container>
  );
};

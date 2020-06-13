import React from "react";
import PriorityRadioGroup from "components/todo-adder-form/PriorityRadioGroup";

export default {
  title: "PriorityRadio"
};

export const priorityRadioGroup = () => {
  return (
    <div>
      <PriorityRadioGroup
        onChange={priority => {
          console.log(priority);
        }}
      />
    </div>
  );
};

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import TodoAdderForm from "./TodoAdderForm";

export default function TodoAdder() {
  return (
    <div
      css={css`
        width: 750px;
        position: fixed;
        bottom: 0;
      `}
    >
      <TodoAdderForm onSubmit={console.log} />
    </div>
  );
}

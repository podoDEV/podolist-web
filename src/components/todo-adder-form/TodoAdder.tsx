/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import TodoAdderForm from "./TodoAdderForm";

export default function TodoAdder() {
  return <TodoAdderForm onSubmit={console.log} />;
}

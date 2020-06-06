/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useForm } from "react-hook-form";

interface Props {}

const FormsContainer = styled("form")`
  display: flex;
  max-width: 562px;
  min-height: 70px;
  border-radius: 22px 22px 0 0;
  background: rgba(244, 244, 244);
  padding: 3px;
`;

// const FormsContainer = styled("forms")`
//   display: flex;
//   width: 100%;
// `;

const InputContainer = styled("div")`
  display: flex;
  border-radius: 44px;
  background: rgb(255, 255, 255);
  width: 100%;
  height: 44px;
`;

const OpenFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
`;

const AddFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: rgb(158, 48, 254);
`;

const ContentsInput = styled("input")`
  width: calc(100% - 88px);
  border: none;
`;

export default function Forms(props: Props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    console.log(data, "data");
  };

  const click = () => {
    console.log("click");
  };

  return (
    <FormsContainer onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <OpenFormsBtn>+</OpenFormsBtn>
        <ContentsInput name="contents" />
        <AddFormsBtn onClick={click}>Add</AddFormsBtn>
      </InputContainer>
    </FormsContainer>
  );
}

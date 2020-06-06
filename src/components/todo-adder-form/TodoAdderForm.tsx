/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useForm } from "react-hook-form";
import AddIcon from "static/img/add-btn.png";
import EnterIcon from "static/img/enter.png";

const FormsContainer = styled("form")`
  display: flex;
  max-width: 562px;
  min-height: 70px;
  border-radius: 22px 22px 0 0;
  background: rgba(244, 244, 244);
  padding: 3px;
`;

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
  background: url(${AddIcon}) 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const AddFormsBtn = styled("button")`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background: rgb(158, 48, 254) url(${EnterIcon}) 50% 50%/ 16px 16px no-repeat;
  cursor: pointer;
`;

const ContentsInput = styled("input")`
  width: calc(100% - 88px);
  border: none;
`;

export default function TodoAdderForm(props: Props) {
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
        <OpenFormsBtn />
        <ContentsInput name="contents" ref={register} />
        <AddFormsBtn onClick={click} />
      </InputContainer>
    </FormsContainer>
  );
}

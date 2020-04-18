/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import checkImg from "static/img/finished.png";

type Priority = "urgent" | "high" | "medium" | "low" | "none";

interface Props {
  priority: Priority;
  text: string;
  date: string;
  checked: boolean;
}

function getColor(priority: Priority) {
  switch (priority) {
    case "urgent":
      return "rgb(208, 2, 27)";
    case "high":
      return "rgb(245, 166, 35)";
    case "medium":
      return "rgb(126, 211, 33)";
    case "low":
      return "rgb(80, 227, 194)";
    case "none":
      return "rgb(74, 144, 226)";
  }
}

const TodoContainer = styled("div")`
  color: rgba(83, 83, 83, 1);
  display: flex;
`;

const CheckboxContainer = styled("div")``;

const Checkbox = styled("div")<Pick<Props, "priority" | "checked">>(({ checked, priority }) => ({
  height: 18,
  width: 18,
  borderRadius: "50%",
  cursor: "pointer",
  border: `2px solid ${checked ? "rgb(215, 215, 215)" : getColor(priority)}`,
  backgroundColor: checked ? "rgb(215, 215, 215)" : "inherit"
}));

const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1px 0;
  margin-left: 24px;
`;

const Text = styled("div")<Pick<Props, "checked">>(({ checked }) => ({
  fontSize: "18px",
  color: checked ? "rgb(151, 151, 151)" : "inherit",
  textDecoration: checked ? "line-through" : "none"
}));

const Date = styled("span")`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 7px;
`;

const checkImgCss = css`
  position: relative;
  height: 18px;
  left: 6px;
  bottom: 22px;
`;

export default function TodoItem(props: Props) {
  const { priority, text, date, checked } = props;

  return (
    <TodoContainer>
      <CheckboxContainer>
        <Checkbox priority={priority} checked={checked} />
        {checked && <img src={checkImg} css={checkImgCss} />}
      </CheckboxContainer>
      <TextContainer>
        <Text checked={checked}>{text}</Text>
        <Date>{date}</Date>
      </TextContainer>
    </TodoContainer>
  );
}

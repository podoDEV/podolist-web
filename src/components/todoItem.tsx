/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { PriorityColor } from "constants/Color";
import { useTheme } from "emotion-theming";
import { Theme } from "../common/styles/Layout";

type Priority = "urgent" | "high" | "medium" | "low" | "none";

interface Props {
  priority: Priority;
  text: string;
  date: string;
  checked: boolean;
}

const TodoContainer = styled("li")`
  color: rgba(83, 83, 83, 1);
  display: flex;
  padding: 10px 0px;
`;

const CheckboxContainer = styled("div")``;

type CheckboxProps = Pick<Props, "priority" | "checked">;

const Checkbox = styled("div")<CheckboxProps>(({ checked, priority }: CheckboxProps) => ({
  height: 18,
  width: 18,
  borderRadius: "50%",
  cursor: "pointer",
  border: `2px solid ${checked ? "rgb(215, 215, 215)" : PriorityColor[priority]}`,
  backgroundColor: checked ? "rgb(215, 215, 215)" : "inherit"
}));

const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1px 0;
  margin-left: 24px;
`;

type TextProps = Pick<Props, "checked"> & { color: string };

const Text = styled("div")<TextProps>(({ checked, color }: TextProps) => ({
  fontSize: "18px",
  color: checked ? "rgb(151, 151, 151)" : color,
  textDecoration: checked ? "line-through" : "none",
  textAlign: "left"
}));

const Date = styled("span")`
  font-size: 14px;
  margin-top: 7px;
  text-align: left;
`;

const checkImgCss = css`
  position: relative;
  height: 18px;
  left: 6px;
  bottom: 22px;
`;

export default function TodoItem(props: Props) {
  const { priority, text, date, checked } = props;
  const { dateTextColor, titleTextColor } = useTheme<Theme>().item;

  return (
    <TodoContainer>
      <CheckboxContainer>
        <Checkbox priority={priority} checked={checked} />
        {checked && <img src={"/images/finished.png"} css={checkImgCss} />}
      </CheckboxContainer>
      <TextContainer>
        <Text checked={checked} color={titleTextColor}>
          {text}
        </Text>
        <Date
          css={css`
            color: ${dateTextColor};
          `}
        >
          {date}
        </Date>
      </TextContainer>
    </TodoContainer>
  );
}

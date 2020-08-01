/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import TitleArea from "./titleArea";
import DateArea from "./dateArea";
import { useTheme } from "emotion-theming";
import { Theme } from "../../common/styles/Layout";

interface Props {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
}

const CalendarContainer = styled("div")`
  display: flex;
  border-radius: 16px;
  padding: 13px 30px;
  flex-direction: column;
  color: rgb(44, 44, 44);
`;

export default function Calendar(props: Props) {
  const { date, setDate } = props;
  const { calendar } = useTheme<Theme>();

  return (
    <CalendarContainer
      css={css`
        background-color: ${calendar.bg};
        color: ${calendar.textColor};
      `}
    >
      <TitleArea date={date} setDate={setDate} />
      <DateArea date={date} setDate={setDate} />
    </CalendarContainer>
  );
}

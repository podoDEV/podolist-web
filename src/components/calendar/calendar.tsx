/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import TitleArea from "./titleArea";
import DateArea from "./dateArea";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}
// @TODO: Global 폰트 적용해야함!
const CalendarContainer = styled("div")`
  display: flex;
  background-color: #fff;
  border-radius: 16px;
  padding: 13px 30px;
  flex-direction: column;
  color: rgb(44, 44, 44);
`;

export default function Calendar(props: Props) {
  const { date, setDate } = props;

  return (
    <CalendarContainer>
      <TitleArea date={date} setDate={setDate} />
      <DateArea date={date} setDate={setDate} />
    </CalendarContainer>
  );
}

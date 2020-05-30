/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import arrowLeft from "../../static/img/calendar-arrow-left.png";
import arrowRight from "../../static/img/calendar-arrow-right.png";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const TitleArea = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5%;
`;

const YearTitle = styled("span")`
  display: flex;
  font-size: 18px;
`;

const MonthArea = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MonthTitle = styled("span")`
  display: flex;
  font-size: 20px;
`;

const MonthButton = styled("a")`
  display: flex;
  font-size: 15px;
  align-items: center;
  cursor: pointer;
`;

const arrowImgStyle = css`
  height: 12px;
`;

export default function CalendarTitleArea(props: Props) {
  const { date, setDate } = props;

  const year = date.year();
  const month = date.format("MMM");
  const prevMonth = date.subtract(1, "month").format("MMM");
  const nextMonth = date.add(1, "month").format("MMM");

  const changeMonth = (prev: boolean) => {
    if (prev) {
      setDate(date.subtract(1, "month"));
    } else {
      setDate(date.add(1, "month"));
    }
  };

  return (
    <TitleArea>
      <YearTitle>{year}</YearTitle>
      <MonthArea>
        <MonthButton onClick={() => changeMonth(true)}>
          <img src={arrowLeft} css={arrowImgStyle} />
          {prevMonth}
        </MonthButton>
        <MonthTitle>{month}</MonthTitle>
        <MonthButton onClick={() => changeMonth(false)}>
          {nextMonth}
          <img src={arrowRight} css={arrowImgStyle} />
        </MonthButton>
      </MonthArea>
    </TitleArea>
  );
}

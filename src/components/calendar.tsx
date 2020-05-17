/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import arrowLeft from "../static/img/calendar-arrow-left.png";
import arrowRight from "../static/img/calendar-arrow-right.png";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}
// @TODO: 폰트!

const CalendarContainer = styled("div")`
  display: flex;
  background-color: #fff;
  border-radius: 16px;
  padding: 13px 30px;
  flex-direction: column;
  color: rgb(44, 44, 44);
`;

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

const DateArea = styled("div")`
  display: flex;
  flex-direction: column;
`;

const DayOfWeekArea = styled("div")`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
`;

const DayOfWeekTitle = styled("span")`
  display: flex;
  font-size: 14px;
  width: 36px;
  justify-content: center;
`;

const DayArea = styled("div")`
  display: flex;
  flex-direction: column;
`;

const WeekArea = styled("div")`
  display: flex;
  justify-content: space-around;
`;

interface DayButtonProps {
  selected?: boolean;
  selectable?: boolean;
}

const DayButton = styled("div")<DayButtonProps>(({ selected, selectable }: DayButtonProps) => ({
  display: "flex",
  width: "36px",
  height: "36px",
  fontSize: "14px",
  justifyContent: "center",
  alignItems: "center",
  margin: "5px 0",
  borderRadius: "18px",
  cursor: selectable ? "pointer" : "normal",
  backgroundColor: selected ? "rgb(158, 48, 254)" : "#fff",
  color: selected ? "#fff" : "rgb(44,44,44)"
}));

const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function Calendar(props: Props) {
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

  const range = (start: number, end: number) => {
    const res: number[] = [];
    if (start <= end) {
      for (let i = start; i < end; i += 1) {
        res.push(i);
      }
    }
    return res;
  };

  const getDateArr = () => {
    const numberOfDay = date.endOf("month").diff(date.startOf("month"), "day") + 1;
    const numberOfprevMonthDay = date
      .startOf("month")
      .diff(date.startOf("month").startOf("week"), "day");
    const numberOfNextMonthDay = date
      .endOf("month")
      .endOf("week")
      .diff(date.endOf("month"), "day");

    let result: (null | Dayjs)[] = range(0, numberOfprevMonthDay).map(() => null);

    result = range(0, numberOfDay).reduce((acc, _, idx) => {
      return [...acc, date.startOf("month").add(idx, "day")];
    }, result);

    return [...result, ...range(0, numberOfNextMonthDay).map(() => null)];
  };

  const cut = (data: (null | Dayjs)[], numb: number) => {
    const len = Math.ceil(data.length / numb);
    const res = [];
    for (let i = 0; i < len; i += 1) {
      res.push(data.slice(i * numb, i * numb + numb));
    }

    return res;
  };

  const dateArr = cut(getDateArr(), 7);

  return (
    <CalendarContainer>
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
      <DateArea>
        <DayOfWeekArea>
          {dayOfWeek.map(day => (
            <DayOfWeekTitle key={`daytitle_${day}`}>{day}</DayOfWeekTitle>
          ))}
        </DayOfWeekArea>
        <DayArea>
          {dateArr.map((week, index) => (
            <WeekArea key={`weekArea_${index}`}>
              {week.map(day => {
                return day ? (
                  <DayButton
                    key={`weekDay_${day}`}
                    selectable={true}
                    selected={day.isSame(date, "date")}
                    onClick={() => setDate(day)}
                  >
                    {day.format("D")}
                  </DayButton>
                ) : (
                  <DayButton>{null}</DayButton>
                );
              })}
            </WeekArea>
          ))}
        </DayArea>
      </DateArea>
    </CalendarContainer>
  );
}

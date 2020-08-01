/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import WeekArea from "./weekArea";
import { range } from "../../common/util";
import { useTheme } from "emotion-theming";
import { Theme } from "../../common/styles/Layout";

interface Props {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
}

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

interface DayOfWeekTitleProps {
  sunday?: boolean;
  color: string;
}

const DayOfWeekTitle = styled("span")<DayOfWeekTitleProps>(
  ({ sunday, color }: DayOfWeekTitleProps) => ({
    display: "flex",
    fontSize: "14px",
    width: "36px",
    justifyContent: "center",
    color: sunday ? "rgb(208,2,27)" : color
  })
);

const DayArea = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function CalendarDateArea(props: Props) {
  const { date, setDate } = props;
  const { calendar } = useTheme<Theme>();

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
    <DateArea>
      <DayOfWeekArea>
        {dayOfWeek.map((day, dayIndex) => (
          <DayOfWeekTitle
            key={`daytitle_${day}`}
            sunday={dayIndex === 0}
            color={calendar.textColor}
          >
            {day}
          </DayOfWeekTitle>
        ))}
      </DayOfWeekArea>
      <DayArea>
        {dateArr.map((week, index) => (
          <WeekArea week={week} key={`weekArea_${index}`} date={date} setDate={setDate} />
        ))}
      </DayArea>
    </DateArea>
  );
}

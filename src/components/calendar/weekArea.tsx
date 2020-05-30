/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";

interface Props {
  date: Dayjs;
  week: (Dayjs | null)[];
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

interface DayButtonProps {
  selected?: boolean;
  selectable?: boolean;
  sunday?: boolean;
}

const DayButton = styled("div")<DayButtonProps>(
  ({ sunday, selected, selectable }: DayButtonProps) => ({
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
    color: selected ? "#fff" : sunday ? "rgb(208,2,27)" : "rgb(44,44,44)"
  })
);

const WeekArea = styled("div")`
  display: flex;
  justify-content: space-around;
`;

export default function CalendarWeekArea(props: Props) {
  const { date, week, setDate } = props;

  return (
    <WeekArea>
      {week.map((day, dayIndex) => {
        return day ? (
          <DayButton
            key={`weekDay_${day}`}
            selectable={true}
            selected={day.isSame(date, "date")}
            sunday={dayIndex === 0}
            onClick={() => setDate(day)}
          >
            {day.format("D")}
          </DayButton>
        ) : (
          <DayButton>{null}</DayButton>
        );
      })}
    </WeekArea>
  );
}

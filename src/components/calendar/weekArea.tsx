/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import { useTheme } from "emotion-theming";
import { Theme } from "../../common/styles/Layout";

interface Props {
  date: Dayjs;
  week: (Dayjs | null)[];
  setDate: (date: Dayjs) => void;
}

interface DayButtonProps {
  selected?: boolean;
  selectable?: boolean;
  sunday?: boolean;
  bgColor: string;
  color: string;
}

const DayButton = styled("div")<DayButtonProps>(
  ({ sunday, selected, selectable, bgColor, color }: DayButtonProps) => ({
    display: "flex",
    width: "36px",
    height: "36px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0",
    borderRadius: "18px",
    cursor: selectable ? "pointer" : "normal",
    backgroundColor: selected ? "rgb(158, 48, 254)" : bgColor,
    color: selected ? "#fff" : sunday ? "rgb(208,2,27)" : color
  })
);

const WeekArea = styled("div")`
  display: flex;
  justify-content: space-around;
`;

export default function CalendarWeekArea(props: Props) {
  const { date, week, setDate } = props;
  const { calendar } = useTheme<Theme>();

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
            color={calendar.textColor}
            bgColor={calendar.bg}
          >
            {day.format("D")}
          </DayButton>
        ) : (
          <DayButton color={calendar.textColor} bgColor={calendar.bg}>
            {null}
          </DayButton>
        );
      })}
    </WeekArea>
  );
}

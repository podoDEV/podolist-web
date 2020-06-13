/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import arrowLeft from "../../static/img/arrow-left.png";
import { dayOfWeek } from "../calendar/dateArea";
import arrowRight from "../../static/img/arrow-right.png";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

interface DayTextProps {
  selected?: boolean;
}

const DateArea = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
`;

const DayArea = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DayOfWeekText = styled("div")`
  display: flex;
  font-size: 15px;
  justify-content: center;
  align-items: center;

  height: 28px;
  width: 28px;
  margin-bottom: 10px;
`;

const DateText = styled("div")<DayTextProps>(({ selected }: DayTextProps) => ({
  display: "flex",
  fontSize: "14px",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",

  height: "28px",
  width: "28px",
  cursor: "pointer",
  borderRadius: "14px",
  boxSizing: "border-box",

  border: selected ? "1px solid #ddd" : "none",
  backgroundColor: selected ? "#fff" : "inherit",
  color: selected ? "#9e30fe" : "#fff"
}));

const ArrowButton = styled("button")`
  display: flex;
  align-items: center;
  height: 24px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  border: none;
`;

const arrowImgStyle = css`
  height: 12px;
`;

export default function NavigationDateArea(props: Props) {
  const { date, setDate } = props;

  const sundayDate = date.startOf("week");

  const onClickArrowIcon = (next: boolean) => {
    const newDate = next ? date.add(1, "week") : date.subtract(1, "week");
    setDate(newDate);
  };

  return (
    <DateArea>
      <ArrowButton onClick={() => onClickArrowIcon(false)}>
        <img src={arrowLeft} css={arrowImgStyle} />
      </ArrowButton>
      {dayOfWeek.map((day, idx) => {
        const dd = sundayDate.add(idx, "day");
        const selected = date.isSame(dd, "date");

        return (
          <DayArea key={`dayArea_${idx}`}>
            <DayOfWeekText>{day}</DayOfWeekText>
            <DateText selected={selected} onClick={() => setDate(dd)}>
              {dd.format("D")}
            </DateText>
          </DayArea>
        );
      })}
      <ArrowButton onClick={() => onClickArrowIcon(true)}>
        <img src={arrowRight} css={arrowImgStyle} />
      </ArrowButton>
    </DateArea>
  );
}

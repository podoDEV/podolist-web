/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import calendarImg from "../../static/img/calendar-icon.png";
import Profile from "../profile/profile";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  profile: string;
}

const InformationArea = styled("div")`
  display: flex;
  padding: 14px 10px;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
`;

const DateTitleArea = styled("div")`
  display: flex;
  align-items: center;
`;

const calendarImgStyle = css`
  height: 20px;
  cursor: pointer;
  margin-left: 5px;
`;

export default function NavigationInformationArea(props: Props) {
  const { date, setDate, profile } = props;

  const month = date.format("M");
  const year = date.format("YYYY");

  const onClickCalendarIcon = () => {
    console.log("click calendar icon");
  };

  return (
    <InformationArea>
      <DateTitleArea>
        {month}월 {year}
        <img src={calendarImg} css={calendarImgStyle} onClick={onClickCalendarIcon} />
      </DateTitleArea>
      <Profile url={profile} />
    </InformationArea>
  );
}

/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  toggleNaviCalendar: () => {};
  name: string;
}

const InformationArea = styled("div")`
  display: flex;
  padding: 14px 0px 10px 14px;
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
`;

const logoutImgStyle = css`
  height: 24px;
  cursor: pointer;
`;

// @TODO: global로 버튼 포커스 아웃라인 없애기
const ImageContainerButton = styled("button")`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  margin-left: 5px;
`;

export default function NavigationInformationArea(props: Props) {
  const { date, setDate, name, toggleNaviCalendar } = props;

  const month = date.format("M");
  const year = date.format("YYYY");

  const onClickLogoutIcon = () => {
    if (window.confirm(`${name}님 로그아웃 하시겠습니까?`)) {
      alert("로그아웃!");
    }
  };

  return (
    <InformationArea>
      <DateTitleArea>
        {month}월 {year}
        <ImageContainerButton onClick={toggleNaviCalendar}>
          <img src={"/images/calendar-icon.png"} css={calendarImgStyle} />
        </ImageContainerButton>
      </DateTitleArea>
      <ImageContainerButton onClick={onClickLogoutIcon}>
        <img src={"/images/logout.png"} css={logoutImgStyle} />
      </ImageContainerButton>
    </InformationArea>
  );
}

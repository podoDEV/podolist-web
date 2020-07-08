/** @jsx jsx */
import React, { MouseEvent, useState } from "react";
import { jsx, css } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import InformationArea from "./informationArea";
import DateArea from "./dateArea";
import Calendar from "../calendar/calendar";
import { mobileScreenWidth } from "../todoList";
import { useTheme } from "emotion-theming";
import { Theme } from "../../common/styles/Layout";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const NavigationWrapper = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 160px;
`;

const NavigationContainer = styled("div")`
  display: flex;
  box-sizing: border-box;
  width: 800px;
  padding: 10px 20px;
  color: #fff;
  flex-direction: column;
`;

const NaviCalendarArea = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 30% 25%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.6);
`;

export const naviCalendarArea = css`
  @media (max-width: 600px) {
    padding: 30% 20px;
  }
`;

export default function Navigation(props: Props) {
  const { date, setDate } = props;
  const [openNaviCalendar, setOpenNaviCalendar] = useState(false);
  const theme = useTheme<Theme>();

  const toggleNaviCalendar = () => {
    setOpenNaviCalendar(!openNaviCalendar);
  };

  const clickDimmedArea = (ev: MouseEvent) => {
    if ((ev.target as HTMLDivElement).id === "dimmedArea") {
      toggleNaviCalendar();
    }
  };

  const gradientBGCSS = css`
    background: ${theme.gradientBG};
  `;

  return (
    <NavigationWrapper css={gradientBGCSS}>
      <NavigationContainer css={[mobileScreenWidth, gradientBGCSS]}>
        <InformationArea date={date} toggleNaviCalendar={toggleNaviCalendar} />
        <DateArea date={date} setDate={setDate} />
        {openNaviCalendar && (
          <NaviCalendarArea css={naviCalendarArea} onClick={clickDimmedArea} id="dimmedArea">
            <Calendar date={date} setDate={setDate} />
          </NaviCalendarArea>
        )}
      </NavigationContainer>
    </NavigationWrapper>
  );
}

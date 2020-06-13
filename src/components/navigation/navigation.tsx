/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import InformationArea from "./informationArea";
import DateArea from "./dateArea";
import Calendar from "../calendar/calendar";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  name: string;
}

const NavigationContainer = styled("div")`
  display: flex;
  background: linear-gradient(#a91efe, #9314fe);
  box-sizing: border-box;
  height: 160px;
  padding: 10px 20px;
  color: #fff;
  flex-direction: column;
`;

const NaviCalendarArea = styled("div")`
  position: absolute;
  width: 100vh;
  height: 100vw;
  top: 0;
  left: 0;
  padding: 30% 20%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.6);
`;

export default function Navigation(props: Props) {
  const { date, setDate, name } = props;
  const [openNaviCalendar, setOpenNaviCalendar] = useState(false);

  const toggleNaviCalendar = () => {
    setOpenNaviCalendar(!openNaviCalendar);
  };

  return (
    <NavigationContainer>
      <InformationArea
        date={date}
        setDate={setDate}
        name={name}
        toggleNaviCalendar={toggleNaviCalendar}
      />
      <DateArea date={date} setDate={setDate} />
      {openNaviCalendar && (
        <NaviCalendarArea>
          <Calendar date={date} setDate={setDate} />
        </NaviCalendarArea>
      )}
    </NavigationContainer>
  );
}

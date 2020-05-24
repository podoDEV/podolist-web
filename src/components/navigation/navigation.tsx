/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import InformationArea from "./informationArea";
import DateArea from "./dateArea";

interface Props {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  profile: string;
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

export default function Navigation(props: Props) {
  const { date, setDate, profile } = props;

  return (
    <NavigationContainer>
      <InformationArea date={date} setDate={setDate} profile={profile} />
      <DateArea date={date} setDate={setDate} />
    </NavigationContainer>
  );
}

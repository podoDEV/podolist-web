import React, { useState } from "react";
import Calendar from "../src/components/calendar";
import styled from "@emotion/styled";
import dayjs from "dayjs";

interface ContainerProps {
  width?: number;
}

const Container = styled.div(
  {
    border: "1px solid red",
    padding: 30,
    backgroundColor: "rgb(244, 244, 244)"
  },
  (props: ContainerProps) => ({
    width: props.width || 600
  })
);

export default {
  title: "calendar"
};

export const basicCalendar = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <Container>
      <Calendar date={date} setDate={setDate} />
    </Container>
  );
};

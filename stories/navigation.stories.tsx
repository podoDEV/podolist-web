import * as React from "react";
import Navigation from "../src/components/navigation/navigation";
import styled from "@emotion/styled";
import { useState } from "react";
import dayjs from "dayjs";

interface ContainerProps {
  width?: number;
}

const Container = styled.div<ContainerProps>(
  {
    border: "1px solid red",
    padding: 30
  },
  (props: ContainerProps) => ({
    width: props.width || 600
  })
);

export default {
  title: "Navigation"
};

export const navigation = () => {
  const [date, setDate] = useState(dayjs());
  const profileImageUrl =
    "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg";

  return (
    <Container>
      <Navigation date={date} setDate={setDate} profile={profileImageUrl} />
    </Container>
  );
};

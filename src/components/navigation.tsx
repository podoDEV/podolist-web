/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

// interface Props {}

const NavigationContainer = styled("div")`
  display: flex;
  height: 64px;
  width: 100%;
  padding: 17px 55px 17px 35px;
  background: linear-gradient(#a91efe, #9314fe);
`;

export default function Navigation() {
  return (
    <NavigationContainer>
      <img src="" />
    </NavigationContainer>
  );
}

import React, { ReactNode } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import img from "../../../public/logo192.png";

const mobileLayout = css`
  max-width: 600px;
  margin: 0 auto;
`;

const sticky = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.4375rem;
`;

const mainLayout = css`
  padding: 3.4375rem;
`;

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div css={mobileLayout}>
      <header css={sticky}></header>
      <main css={mainLayout}>{children}</main>
    </div>
  );
}

export default Layout;

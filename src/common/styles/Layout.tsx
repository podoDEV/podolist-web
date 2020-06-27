import React, { ReactNode } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const mobileLayout = css`
  margin: 0 auto;
`;

const mainLayout = css`
  height: 100vh;
`;

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div css={mobileLayout}>
      <main css={mainLayout}>{children}</main>
    </div>
  );
}

export default Layout;

import React, { ReactNode } from "react";
import { ThemeProvider } from "emotion-theming";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { State } from "../../pages/_app";
import { StyleState } from "../../redux/reducers/style";
import { GlobalStyle } from "../../globalStyle";
import styled from "@emotion/styled";
import { imageMap } from "./imageMap";

type LayoutProps = {
  children: ReactNode;
};

export interface Theme {
  buttonIcon: string;
  gradientBG: string;
  formsBG: string;
  bg: string;
  itemTitleText: string;
  itemDateText: string;
  item: {
    titleTextColor: string;
    dateTextColor: string;
  };
  calendar: {
    bg: string;
    textColor: string;
  };
  dropbox: {
    bg: string;
    border: string;
    textColor: string;
  };
  borderBottom: string;
}

const mobileLayout = css`
  margin: 0 auto;
`;

type MainLayoutTheme = Pick<Theme, "bg">;

const MainLayout = styled("main")<MainLayoutTheme>(({ bg }: MainLayoutTheme) => ({
  background: bg,
  transition: "background .4s ease"
}));

const dark = {
  buttonIcon: `url(${imageMap.MOON}) 50% 50%/ 16px 16px no-repeat`,
  gradientBG: "linear-gradient(#101010,#2b2b2b)",
  bg: "#121212",
  formsBG: "#2d2d2d",
  item: {
    titleTextColor: "rgb(255,255,255)",
    dateTextColor: "rgba(255,255,255,0.5)"
  },
  calendar: {
    bg: "#252525",
    textColor: "#fff"
  },
  dropbox: {
    bg: "#414448",
    textColor: "#fff",
    border: "1px solid #111"
  },
  borderBottom: "0.5px solid #3a3a3a"
};

const light = {
  buttonIcon: `url(${imageMap.SUN}) 50% 50%/ 16px 16px no-repeat`,
  gradientBG: "linear-gradient(#a91efe, #9314fe)",
  bg: "#fff",
  formsBG: "rgb(244, 244, 244)",
  item: {
    titleTextColor: "rgb(83,83,83)",
    dateTextColor: "rgba(0,0,0,0.5)"
  },
  calendar: {
    bg: "#fff",
    textColor: "#2c2c2c"
  },
  dropbox: {
    bg: "#fff",
    textColor: "#000",
    border: "1px solid #fff"
  },
  borderBottom: "0.5px solid #ececec"
};

function Layout({ children }: LayoutProps) {
  const { darkMode } = useSelector<State, StyleState>(state => state.style);

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <GlobalStyle />
      <div css={mobileLayout}>
        <MainLayout bg={darkMode ? dark.bg : light.bg}>{children}</MainLayout>
      </div>
    </ThemeProvider>
  );
}

export default Layout;

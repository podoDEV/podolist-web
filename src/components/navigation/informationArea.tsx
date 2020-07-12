/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../pages/_app";
import { UserState } from "../../redux/reducers/user";
import { StyleState } from "../../redux/reducers/style";
import { setDarkMode } from "../../redux/actions/style";
import { Theme } from "../../common/styles/Layout";
import { setLocalStorageDarkMode } from "../../common/styles/darkMode";

interface Props {
  date: Dayjs;
  toggleNaviCalendar: () => void;
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
  height: 20px;
  cursor: pointer;
`;

const RightAreaContainer = styled("div")`
  display: flex;
  align-items: center;
`;

const Name = styled("span")`
  font-size: 15px;
`;

const ImageContainerButton = styled("button")`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
`;

interface DarkModeButtonProps {
  buttonIcon: string;
}

const DarkModeButton = styled("div")<DarkModeButtonProps>(
  ({ buttonIcon }: DarkModeButtonProps) => ({
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: buttonIcon,
    border: "none",
    cursor: "pointer",
    transition: "background .5s ease"
  })
);

export default function NavigationInformationArea(props: Props) {
  const { date, toggleNaviCalendar } = props;
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();

  const month = date.format("M");
  const year = date.format("YYYY");
  const user = useSelector<State, UserState | null>(state => state.user);
  const { darkMode } = useSelector<State, StyleState>(state => state.style);

  const onClickLogoutIcon = () => {
    if (window.confirm(`${user!.name}님 로그아웃 하시겠습니까?`)) {
      alert("로그아웃!");
    }
  };

  const onClickDarkModeIcon = () => {
    setLocalStorageDarkMode(!darkMode);
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <InformationArea>
      <DateTitleArea>
        {month}월 {year}
        <ImageContainerButton onClick={toggleNaviCalendar}>
          <img src={"/images/calendar-icon.png"} css={calendarImgStyle} />
        </ImageContainerButton>
      </DateTitleArea>
      <RightAreaContainer>
        {user && <Name>🙋‍♀️ {user.name} 님</Name>}
        <DarkModeButton onClick={onClickDarkModeIcon} buttonIcon={theme.buttonIcon} />
        <ImageContainerButton onClick={onClickLogoutIcon}>
          <img src={"/images/logout.png"} css={logoutImgStyle} />
        </ImageContainerButton>
      </RightAreaContainer>
    </InformationArea>
  );
}

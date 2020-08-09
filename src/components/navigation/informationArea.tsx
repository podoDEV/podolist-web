/** @jsx jsx */
import React, { useState, useRef } from "react";
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import * as apiUrl from "../../common/apiUrl";
import { State } from "../../pages/_app";
import { UserState } from "../../redux/reducers/user";
import { StyleState } from "../../redux/reducers/style";
import { setDarkMode } from "../../redux/actions/style";
import { Theme } from "../../common/styles/Layout";
import { setLocalStorageDarkMode } from "../../common/styles/darkMode";
import { post } from "../../common/fetch";
import { imageMap } from "../../common/styles/imageMap";

interface Props {
  date: Dayjs;
  toggleNaviCalendar: () => void;
}

const RightArea = styled("div")`
  display: flex;
`;

const InformationArea = styled("div")`
  display: flex;
  padding: 14px 0px 10px 14px;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
`;

const DateTitleArea = styled("a")`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileImageArea = styled("button")`
  border: none;
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

const profileImageCss = css`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const Name = styled("span")`
  text-align: left;
  font-size: 13px;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ImageContainerButton = styled("button")`
  height: 30px;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  padding: 0;
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

const Dropbox = styled("div")`
  display: flex;
  padding: 5px 10px;
  position: absolute;
  top: 50px;
  border-radius: 5px;
`;

const DropboxContent = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

export default function NavigationInformationArea(props: Props) {
  const { date, toggleNaviCalendar } = props;
  const [openDropbox, setOpenDropbox] = useState(false);
  const dispatch = useDispatch();
  const { buttonIcon, dropbox } = useTheme<Theme>();

  const profileImageRef = useRef<HTMLImageElement>(null);
  const month = date.format("M");
  const year = date.format("YYYY");
  const user = useSelector<State, UserState | null>(state => state.user);
  const { darkMode } = useSelector<State, StyleState>(state => state.style);

  const onClickLogoutIcon = () => {
    if (window.confirm(`${user!.name}님 로그아웃 하시겠습니까?`)) {
      post(apiUrl.logout());
      Router.push("/login");
    }
  };

  const onClickDarkModeIcon = () => {
    setLocalStorageDarkMode(!darkMode);
    dispatch(setDarkMode(!darkMode));
  };

  const toggleProfileDropbox = () => {
    setOpenDropbox(!openDropbox);
  };

  return (
    <InformationArea>
      <DateTitleArea onClick={toggleNaviCalendar}>
        {month}월 {year}
      </DateTitleArea>
      <RightArea>
        <DarkModeButton onClick={onClickDarkModeIcon} buttonIcon={buttonIcon} />
        <ProfileImageArea onClick={toggleProfileDropbox}>
          {user && (
            <img
              src={user.profileImageUrl ?? imageMap.PERSON}
              css={profileImageCss}
              ref={profileImageRef}
            />
          )}
          {openDropbox && (
            <Dropbox
              css={css`
                background-color: ${dropbox.bg};
                border: ${dropbox.border};
                color: ${dropbox.textColor};
                left: ${profileImageRef?.current
                  ? profileImageRef.current.getBoundingClientRect().left - 90 + "px"
                  : "0px"};
              `}
            >
              <DropboxContent>
                {user && <Name>{user.name}</Name>}
                <ImageContainerButton
                  onClick={onClickLogoutIcon}
                  css={css`
                    color: ${dropbox.textColor};
                  `}
                >
                  로그아웃 ✋
                </ImageContainerButton>
              </DropboxContent>
            </Dropbox>
          )}
        </ProfileImageArea>
      </RightArea>
    </InformationArea>
  );
}

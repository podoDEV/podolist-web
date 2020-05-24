/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

interface Props {
  url: string;
}

const ProfileArea = styled("div")`
  height: 22px;
  width: 22px;
  border-radius: 11px;
  cursor: pointer;
  overflow: hidden;
`;

const profileImgStyle = css`
  height: 22px;
  width: 22px;
`;

export default function Navigation(props: Props) {
  const { url } = props;

  const onClickProfile = () => {
    console.log("click profile");
  };

  return (
    <ProfileArea>
      <img src={url} css={profileImgStyle} onClick={onClickProfile} />
    </ProfileArea>
  );
}

/** @jsx jsx */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { jsx, keyframes, css } from "@emotion/core";
import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseV2 } from "react-kakao-login/dist/types";
import { applyUserInfo } from "../actions/user";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import Cookies from "js-cookie";
import { post } from "../common/fetch";
import Router from "next/router";

const slide = keyframes`
  0% { height: 0% }
  100% { height: 100% }
`;

const bounce = keyframes`
  from, 4%, 10%, 16%, to {transform: translate3d(0,0,0);}
  8% {transform: translate3d(0, -10px, 0);}
  12% {transform: translate3d(0, -5px, 0);}
  18% {transform: translate3d(0,-2px,0);}
`;

const AnimationContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(#9314fe, #a91efe);
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled("p")`
  color: #fff;
  letter-spacing: 1px;
  font-size: 20px;
  margin-bottom: 13px;
  align-self: flex-end;
`;

const KakaoLoginBtn = styled(KakaoLogin)`
  border: none;
  background: no-repeat center url(/images/kakao-login.png);
  height: 65px;
  width: 183px;
  transition-delay: 2s;
`;

export default function Index() {
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState("START");

  useEffect(() => {
    setTimeout(() => {
      setPageStatus("SLIDE_FINISH");
    }, 1300);
  }, []);

  const success = (res: KakaoLoginResponseV2) => {
    const { access_token: accessToken } = res.response;
    post(apiUrl.login(), JSON.stringify({ accessToken }))
      .then(res => {
        const { sessionId, user } = res;
        Cookies.set("SESSIONID", sessionId, { domain: ".podolist.com", path: "/" });
        dispatch(applyUserInfo(user));
      })
      .then(() => {
        Router.push("/todo");
      });
    // error 처리
  };

  const failure = () => {
    console.log("fail");
  };

  return (
    <AnimationContainer
      css={css`
        animation: ${slide} 1.5s ease;
      `}
    >
      {pageStatus !== "START" && (
        <ButtonContainer>
          <Title>생각보다 괜찮은 투두리스트</Title>
          <img
            src={"/images/logo.png"}
            css={css`
              height: 60px;
              margin-bottom: 45px;
            `}
          />
          <KakaoLoginBtn
            jsKey="0888a2c569cd376400ea3dc50d925724"
            onSuccess={success}
            onFailure={failure}
            buttonText=""
            css={css`
              animation: ${bounce} 5s ease infinite;
            `}
          />
        </ButtonContainer>
      )}
    </AnimationContainer>
  );
}

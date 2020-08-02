/** @jsx jsx */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { jsx, keyframes, css } from "@emotion/core";
import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseV2 } from "react-kakao-login/dist/types";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/user";

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
  height: 100%;
  align-items: center;
  justify-content: center;
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

const ElementContainer = styled("div")`
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: absolute;
  top: 0;
`;

export default function Login() {
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState("SLICE_START");

  useEffect(() => {
    setTimeout(() => {
      setPageStatus("SLIDE_FINISH");
    }, 0);
  }, []);

  const success = (res: KakaoLoginResponseV2) => {
    const { access_token: accessToken } = res.response;
    dispatch(userLogin(accessToken));
  };

  const failure = () => {
    console.log("fail");
  };

  return (
    <div style={{ height: "100vh" }}>
      <AnimationContainer
        css={css`
          animation: ${slide} 1.3s ease;
        `}
      />
      <ElementContainer>
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
              animation: ${bounce} 3s ease infinite;
              visibility: ${pageStatus === "SLIDE_FINISH" ? "visible" : "hidden"};
            `}
          />
        </ButtonContainer>
      </ElementContainer>
    </div>
  );
}

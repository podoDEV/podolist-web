/** @jsx jsx */
import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseV2 } from "react-kakao-login/dist/types";
import { useDispatch, useSelector } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import Cookies from "js-cookie";
import { post } from "../common/fetch";
import { State } from "./_app";

const KakaoLoginBtn = styled(KakaoLogin)`
  border: none;
  background: no-repeat center url(/images/kakao-login.png);
  height: 45px;
  width: 183px;
`;

export default function Index() {
  const success = (res: KakaoLoginResponseV2) => {
    const { access_token: accessToken } = res.response;
    post(apiUrl.login(), JSON.stringify({ accessToken })).then(res => {
      const { sessionId, user } = res;
      Cookies.set("SESSIONID", sessionId, { domain: ".podolist.com", path: "/" });
      // @TODO: user 정보 context나 어디에 저장하기
      // @TODO: redirect. 이건 계정 정보 확인하는 액션에서 수행하는게 좋을 듯
    });
    // error 처리
  };

  const failure = () => {
    console.log("fail");
  };

  const user = useSelector<State>(state => state.user);

  console.log(user);

  return (
    <div>
      <KakaoLoginBtn
        jsKey="0888a2c569cd376400ea3dc50d925724"
        onSuccess={success}
        onFailure={failure}
        buttonText=""
      />
    </div>
  );
}

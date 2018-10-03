import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';

const APP_KEY = '0888a2c569cd376400ea3dc50d925724';

const success = (response) => {
  console.log(response);
};

const failure = (error) => {
  console.log(error);
};

class Login extends Component {
  componentDidMount() {}

  render() {
    return <KakaoLogin jsKey={APP_KEY} onSuccess={success} onFailure={failure} useDefaultStyle />;
  }
}

export default Login;

import React, {Component} from 'react';
import '../static/css/App.css';
import {axiosTest} from '../actions/todo';

class Login extends Component {
  componentDidMount() {
    axiosTest();
  }

  render() {
    return (
      <div className="container">
        <button>카카오톡으로 로그인 하기</button>
      </div>
    );
  }
}

export default Login;

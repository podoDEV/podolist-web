import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';
import {userLogin} from '../actions/login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const APP_KEY = '0888a2c569cd376400ea3dc50d925724';

class Login extends Component {
  static propTypes = {
    userLogin: PropTypes.func
  };

  success = (res) => {
    this.props.userLogin(res.response.access_token);
  };

  failure = (error) => {
    console.error(error);
  };

  render() {
    return (
      <div className="wrap">
        <div className="login-div">
          <div className="logo-area">Podolist is coming!</div>
          <div className="btn-area">
            <KakaoLogin
              jsKey={APP_KEY}
              onSuccess={this.success}
              onFailure={this.failure}
              className="kakao-btn-design"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin
};

export default connect(
  null,
  mapDispatchToProps
)(Login);

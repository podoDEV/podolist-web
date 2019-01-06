import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BounceLoader} from 'react-spinners';

import PropTypes from 'prop-types';
import {userLogin} from '../actions/login';
import {handleError} from '../sagas/todo';

const APP_KEY = '0888a2c569cd376400ea3dc50d925724';
// @TODO: 35px bounce loader bg rgba(0,0,0,0.05)
class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLogin: PropTypes.func
  };

  state = {
    isLoading: true
  };

  componentDidMount() {}

  success = (res) => {
    this.props.userLogin(res.response.access_token);
  };

  failure = (error) => {
    handleError(error);
  };

  render() {
    return (
      <div className="wrap">
        <div className={`loader-container ${!this.state.isLoading ? 'show' : 'none'}`}>
          <BounceLoader
            sizeUnit={'px'}
            size={30}
            color={'#9e30fe'}
            top="40%"
            style={{
              top: '40%',
              backgroundColor: '#fff'
            }}
          />
        </div>
        <div className="login-div">
          <div className="logo-area" />
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

const mapStateToProps = (state) => ({
  user: state.users
});

const mapDispatchToProps = {
  userLogin
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BounceLoader} from 'react-spinners';
import PropTypes from 'prop-types';

import {userLogin} from '../actions/login';
import {handleError} from '../sagas/todo';
import {isMobileDevice} from '../common';
import AppStoreDownloadPage from './appStoreDownloadPage';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLogin: PropTypes.func
  };

  state = {
    isLoading: true,
    isMobilePage: isMobileDevice()
  };

  success = (res) => {
    this.props.userLogin(res.access_token);
  };

  failure = (error) => {
    handleError(error);
  };

  componentDidMount() {
    window.Kakao.Auth.createLoginButton({
      container: '#btn-area',
      success: this.success,
      fail: this.failure
    });
  }

  render() {
    const {isMobilePage} = this.state;

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
          <div className="btn-area" id="btn-area" />
        </div>
        {isMobilePage && <AppStoreDownloadPage />}
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

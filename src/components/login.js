import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {BounceLoader} from 'react-spinners';

import history from '../browserHistory';
import PropTypes from 'prop-types';
import {userLogin} from '../actions/login';

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

  componentDidMount() {
    const cookies = new Cookies();
    const sessionId = cookies.get('SESSIONID');
    const {user} = this.props;

    if (sessionId && !_.isEmpty(user)) {
      history.replace('/');
    }
  }

  success = (res) => {
    this.props.userLogin(res.response.access_token);
  };

  failure = (error) => {
    console.error(error);
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

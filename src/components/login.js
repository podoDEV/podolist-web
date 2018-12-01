import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

import history from '../browserHistory';
import PropTypes from 'prop-types';
import {userLogin} from '../actions/login';

const APP_KEY = '0888a2c569cd376400ea3dc50d925724';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLogin: PropTypes.func
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

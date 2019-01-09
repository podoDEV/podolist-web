import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
// import Cookies from 'js-cookie';
import _ from 'lodash';

import history from '../../browserHistory';
import Week from '../week/index';
import {fetchUserInfoSaga} from '../../actions/login';
import {resetTodaySaga} from '../../actions/today';
// import {COOKIE_DOMAIN} from '../../sagas/login';
import logoutImg from '../../static/img/logout.png';
import blankProfileImg from '../../static/img/user.png';
import blankProfilePodoImg from '../../static/img/podo-user.png';
import mainLogoImg from '../../static/img/main-logo.png';
import {logout} from '../../service/login';

const saying = [
  '시간을 선택하는 것은 시간을 절약하는 것이다. -베이컨-',
  '시간을 충실하게 만드는 것이 행복이다. -에머슨-',
  '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다. -에디슨-',
  '내가 헛되이 보낸 오늘 하루는 어제 죽어간 이들이 그토록 바라던 하루이다. -소포클레스-',
  '많은 인생은 시간의 낭비에 의해서 한층 짧아진다. -존슨-',
  '계획이란 미래에 관한 현재의 결정이다. -드래커-'
];

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    profileImageUrl: PropTypes.string,
    selectedDate: PropTypes.number,
    base: PropTypes.number,
    setOpenTodayCalendarModal: PropTypes.func,
    openTodayCalendarModal: PropTypes.bool,
    fetchUserInfoSaga: PropTypes.func,
    resetTodaySaga: PropTypes.func
  };

  state = {
    isOpenProfileMenu: false,
    sayingIdx: _.random(0, saying.length - 1)
  };

  componentDidMount() {
    const {user} = this.props;
    if (_.isEmpty(user)) {
      this.props.fetchUserInfoSaga();
    }
  }

  handleClickMainLogo = () => {
    this.props.resetTodaySaga();
  };

  handleClickSearchButton = () => {
    alert('검색 기능은 준비중이에요!🥴');
  };

  handleClickLanguageChangeButton = () => {
    alert('언어 선택 기능은 준비중이에요!🥴');
  };

  handleClickLogoutButton = () => {
    logout();
    history.replace('/login');
  };

  toggleProfileMenu = () => {
    const {isOpenProfileMenu} = this.state;

    this.setState({
      isOpenProfileMenu: !isOpenProfileMenu
    });
  };

  renderProfileMenuArea = () => {
    const {isOpenProfileMenu} = this.state;
    const {
      user: {name, profileImageUrl}
    } = this.props;
    const profileUrl = profileImageUrl ? profileImageUrl : blankProfileImg;
    const contextProfileUrl = profileImageUrl ? profileImageUrl : blankProfilePodoImg;

    return (
      <div className="profile-btn-area">
        <div className="profile-btn" onClick={this.toggleProfileMenu}>
          <img src={profileUrl} className="profile-img" />
        </div>
        <div className={`profile-menu-area ${isOpenProfileMenu ? 'opened' : ''}`}>
          <div className="context profile">
            <img src={contextProfileUrl} className="profile-img" />
            <div className="account">
              <p className="name">{name}</p>
              {/*@TODO: email 동의 얻어야 하는 부분 있어서 이후 스펙으로 분리*/}
              {/*<p className="email">{email}</p>*/}
            </div>
          </div>
          <div className="context log-out" onClick={this.handleClickLogoutButton}>
            <img src={logoutImg} className="logout-img" />
            <span>로그아웃</span>
          </div>
          <div className="context language-area">
            <button className="selected">한국어</button>
            <button onClick={this.handleClickLanguageChangeButton}>English</button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {selectedDate, base, openTodayCalendarModal} = this.props;
    const {sayingIdx} = this.state;

    const date = moment()
      .set('date', selectedDate)
      .add(base, 'M');
    const month = date.format('MMMM');
    const year = date.format('YYYY');

    return (
      <div className={`header-container ${openTodayCalendarModal ? 'blurred' : ''}`}>
        <header className="todo-header">
          <div className="todo-date-title-sm-show">
            <p className="month" onClick={this.handleClickMonth}>
              {month}
            </p>
            <p className="year">{year}</p>
          </div>
          <div className="logo-area">
            <img src={mainLogoImg} onClick={this.handleClickMainLogo} />
          </div>
          <div className="search-area">
            {/*<div className="search-bar">*/}
            {/*<input type="text" className="search-input" />*/}
            {/*<button className="search-icon-btn" onClick={this.handleClickSearchButton} />*/}
            {/*</div>*/}
            {saying[sayingIdx]}
          </div>
          <div className="right-area">
            {/*<div className="search-btn-sm-show">*/}
            {/*<button className="search-icon-btn" onClick={this.handleClickSearchButton} />*/}
            {/*</div>*/}
            {this.renderProfileMenuArea()}
          </div>
        </header>
        <Week />
      </div>
    );
  }

  handleClickMonth = () => {
    const {setOpenTodayCalendarModal} = this.props;

    setOpenTodayCalendarModal(true);
  };
}

const mapStateToProps = (state) => ({
  user: state.users,
  selectedDate: state.today.selectedDate,
  base: state.today.base
});

const mapDispatchToProps = {
  fetchUserInfoSaga,
  resetTodaySaga
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import history from '../../browserHistory';
import Week from '../week/index';
import logoutImg from '../../static/img/logout.png';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    selectedDate: PropTypes.number,
    base: PropTypes.number,
    setOpenTodayCalendarModal: PropTypes.func,
    openTodayCalendarModal: PropTypes.bool
  };

  state = {
    isOpenProfileMenu: false
  };

  handleClickSearchButton = () => {
    alert('검색 기능은 준비중이에요!🥴');
  };

  handleClickLanguageChangeButton = () => {
    alert('언어 선택 기능은 준비중이에요!🥴');
  };

  handleClickLogoutButton = () => {
    const cookie = new Cookies();
    cookie.remove('SESSIONID');
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
      user: {name}
    } = this.props;
    const profileUrl = 'https://loremflickr.com/320/240/dogs';
    const email = 'hanjungv@gmail.com';
    const profileOpenButtonStyle = {
      background: `rgba(0,0,0,0) url(${profileUrl}) no-repeat center`
    };

    return (
      <div className="profile-btn-area">
        <div className="profile-btn" onClick={this.toggleProfileMenu} style={profileOpenButtonStyle} />
        <div className={`profile-menu-area ${isOpenProfileMenu ? 'opened' : ''}`}>
          <div className="context profile">
            <img src="https://loremflickr.com/320/240/dogs" className="profile-img" />
            <div className="account">
              <p className="name">{name}</p>
              <p className="email">{email}</p>
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
            <Link to="/">Podolist</Link>
          </div>
          <div className="search-area">
            <div className="search-bar">
              <input type="text" className="search-input" />
              <button className="search-icon-btn" onClick={this.handleClickSearchButton} />
            </div>
          </div>
          <div className="right-area">
            <div className="search-btn-sm-show">
              <button className="search-icon-btn" onClick={this.handleClickSearchButton} />
            </div>
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

export default connect(mapStateToProps)(Header);

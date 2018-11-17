import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import Week from '../week/index';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    selectedDate: PropTypes.number,
    base: PropTypes.number,
    setOpenTodayCalendarModal: PropTypes.func,
    openTodayCalendarModal: PropTypes.bool
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
              <button className="search-icon-btn" />
            </div>
          </div>
          <div className="right-area">
            <div className="search-btn-sm-show">
              <button className="search-icon-btn" />
            </div>
            <div className="profile-btn" />
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
  selectedDate: state.today.selectedDate,
  base: state.today.base
});

export default connect(mapStateToProps)(Header);

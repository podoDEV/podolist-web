import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import List from './list';
import Forms from './forms';
import Calendar from '../calendar';
import Header from './header';
import TodayCalendarModal from './todayCalendarModal';
import {changeTodayDate, changeTodayBase} from '../../actions/today';

class Index extends Component {
  static propTypes = {
    base: PropTypes.number.isRequired,
    selectedDate: PropTypes.number,
    changeTodayBase: PropTypes.func.isRequired,
    changeTodayDate: PropTypes.func.isRequired
  };

  state = {
    openTodayCalendarModal: false
  };

  setOpenTodayCalendarModal = (val) => {
    this.setState({
      openTodayCalendarModal: val
    });
  };

  render() {
    const {base, changeTodayBase, changeTodayDate, selectedDate} = this.props;
    const {openTodayCalendarModal} = this.state;

    return (
      <div className="wrap">
        <TodayCalendarModal
          openTodayCalendarModal={openTodayCalendarModal}
          setOpenTodayCalendarModal={this.setOpenTodayCalendarModal}
        />
        <Header
          setOpenTodayCalendarModal={this.setOpenTodayCalendarModal}
          openTodayCalendarModal={openTodayCalendarModal}
        />
        <div className={`body-area ${openTodayCalendarModal ? 'blurred' : ''}`}>
          <section className="main-container">
            <List />
            <Forms />
          </section>
          <section className="today-calendar-container">
            <Calendar
              base={base}
              selectedDate={selectedDate}
              changeDateBase={changeTodayBase}
              changeSelectedDate={changeTodayDate}
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  base: state.today.base,
  selectedDate: state.today.selectedDate
});

const mapDispatchToProps = {
  changeTodayDate,
  changeTodayBase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

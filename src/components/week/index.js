import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {DAYS} from '../../constant';
import {changeTodayDate, changeTodayBase} from '../../actions/today';
import {getBase} from '../../reducers/forms';

class Index extends Component {
  static propTypes = {
    base: PropTypes.number,
    changeTodayDate: PropTypes.func,
    changeTodayBase: PropTypes.func,
    selectedDate: PropTypes.number
  };

  getWeekStartDate = () => {
    const {selectedDate, base} = this.props;

    return (
      Number(
        moment()
          .set('date', selectedDate)
          .add(base, 'M')
          .startOf('week')
          .unix()
      ) * 1000
    );
  };

  // <div className="week-date-item">
  // <p className="day">thu</p>
  // <div className="date selected has">
  // <div className="red-pin" />5
  // </div>
  // </div>

  isChangeMonth = (val) => {
    const {selectedDate, base} = this.props;

    const prevWeekStartDate = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY-MM');
    const newWeekStartDate = moment(this.getWeekStartDate())
      .add(val, 'weeks')
      .format('YYYY-MM');

    return prevWeekStartDate !== newWeekStartDate;
  };

  handleClickNextWeek = () => {
    const {changeTodayBase, changeTodayDate} = this.props;

    const newWeekStartDate = Number(
      moment(this.getWeekStartDate())
        .add(1, 'weeks')
        .unix() * 1000
    );

    const newDate = Number(moment(newWeekStartDate).format('D'));

    if (this.isChangeMonth(1)) {
      changeTodayBase(1);
    }
    changeTodayDate(newDate);
  };

  handleClickPrevWeek = () => {
    const {changeTodayBase, changeTodayDate} = this.props;

    const newWeekStartDate = Number(
      moment(this.getWeekStartDate())
        .add(-1, 'weeks')
        .unix() * 1000
    );
    const newDate = Number(moment(newWeekStartDate).format('D'));

    if (this.isChangeMonth(-1)) {
      changeTodayBase(-1);
    }
    changeTodayDate(newDate);
  };

  handleClickDateItem = (dateUnix) => {
    const {changeTodayBase, changeTodayDate, base: prevBase} = this.props;
    const date = Number(moment(dateUnix).format('D'));
    const month = Number(moment(dateUnix).format('M'));

    const prevMonth = Number(
      moment()
        .add(prevBase, 'M')
        .format('M')
    );

    if (month - prevMonth !== 0) {
      if (month - prevMonth === -11) {
        console.log('h!');
        changeTodayBase(1);
      } else {
        changeTodayBase(month - prevMonth);
      }
    }

    changeTodayDate(date);
  };

  renderDateItem() {
    const {selectedDate} = this.props;

    let weekStartDate = this.getWeekStartDate();

    return _.map(DAYS, (day, index) => {
      let dateUnix =
        moment(weekStartDate)
          .add(index, 'days')
          .unix() * 1000;
      let date = Number(moment(dateUnix).format('D'));
      const isToday = selectedDate === date;

      return (
        <div className="week-date-item" key={`${index}_week_day`}>
          <p className="day">{day}</p>
          <div className={`date ${isToday ? 'selected' : ''}`} onClick={() => this.handleClickDateItem(dateUnix)}>
            <div className="red-pin" />
            {date}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="week-container">
        <button className="week-move-btn left" onClick={this.handleClickPrevWeek}>
          왼쪽
        </button>
        <div className="week-date-area">{this.renderDateItem()}</div>
        <button className="week-move-btn right" onClick={this.handleClickNextWeek}>
          오른쪽
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedDate: state.today.selectedDate,
  base: state.today.base
});

const mapDispatchToProps = {
  changeTodayDate,
  changeTodayBase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

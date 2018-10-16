import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DateArea extends Component {
  static propTypes = {
    base: PropTypes.number,
    updateSelectedDate: PropTypes.func,
    selectedDate: PropTypes.number
  };

  handleChangeDate = (isThisMonth, date) => {
    if (isThisMonth) {
      this.props.updateSelectedDate(date);
    }
  };

  renderCalenderDateItem = (dateObj) => {
    const {selectedDate} = this.props;
    const {date, isThisMonth} = dateObj;

    return (
      <td
        className={`${isThisMonth ? '' : 'not-this-month'}`}
        onClick={() => this.handleChangeDate(isThisMonth, date)}
        key={date}
      >
        <div className={`each-date ${isThisMonth && selectedDate === date ? 'selected' : ''}`}>{date}</div>
      </td>
    );
  };

  renderCalendarRow = (dateArr) => {
    return <tr key={Math.random()}>{_.map(dateArr, (dateObj) => this.renderCalenderDateItem(dateObj))}</tr>;
  };

  getFirstWeek = (firstDay, lastMonthDate) => {
    let week = [];

    for (let i = 0; i < firstDay; i += 1) {
      const date = lastMonthDate - firstDay + 1 + i;
      week.push({
        date,
        isThisMonth: false
      });
    }
    let date = 1;
    while (week.length !== 7) {
      week.push({
        date,
        isThisMonth: true
      });
      date += 1;
    }

    return week;
  };

  getWeek = (startDate, lastDate) => {
    let week = [];
    let i,
      j = 1;

    for (i = 0; i < 7; i += 1) {
      const date = startDate + i;
      if (date > lastDate) {
        break;
      }
      week.push({
        date: startDate + i,
        isThisMonth: true
      });
    }

    for (i; i < 7; i += 1) {
      week.push({
        date: j,
        isThisMonth: false
      });
      j += 1;
    }

    return week;
  };

  renderCalendar = () => {
    const {base} = this.props;
    const lastMonthDate = moment()
      .add(base, 'M')
      .subtract(1, 'months')
      .endOf('month')
      .format('DD');
    const firstDay = moment()
      .add(base, 'M')
      .startOf('month')
      .format('d');
    const lastDate = moment()
      .add(base, 'M')
      .endOf('month')
      .format('DD');

    let date = 7 - firstDay + 1;
    let weeks = [this.getFirstWeek(firstDay, lastMonthDate)];

    while (date <= lastDate) {
      weeks.push(this.getWeek(date, lastDate));
      date += 7;
    }

    return _.map(weeks, (week) => this.renderCalendarRow(week));
  };

  render() {
    return <tbody className="calendar-date-area">{this.renderCalendar()}</tbody>;
  }
}

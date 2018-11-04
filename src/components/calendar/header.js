import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Header extends Component {
  static propTypes = {
    base: PropTypes.number,
    moveToMonth: PropTypes.func
  };

  render() {
    const {base, moveToMonth} = this.props;
    const year = moment()
      .add(base, 'M')
      .format('YYYY');
    const month = moment()
      .add(base, 'M')
      .format('MMMM');

    const prevMonth = moment()
      .add(base - 1, 'M')
      .format('MMM');
    const nextMonth = moment()
      .add(base + 1, 'M')
      .format('MMM');

    return (
      <div className="calendar-header">
        <h2 className="year">{year}</h2>
        <div className="month">
          <button className="prev-move-btn" onClick={() => moveToMonth(-1)}>
            {prevMonth}
          </button>
          <span>{month}</span>
          <button className="next-move-btn" onClick={() => moveToMonth(1)}>
            {nextMonth}
          </button>
        </div>
      </div>
    );
  }
}

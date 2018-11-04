import React, {Component} from 'react';

import '../../static/css/calendar.css';
import DayArea from './dayArea';
import DateArea from './dateArea';
import Header from './header';
import PropTypes from 'prop-types';

export default class Index extends Component {
  static propTypes = {
    base: PropTypes.number.isRequired,
    selectedDate: PropTypes.number.isRequired,
    moveToMonth: PropTypes.func.isRequired,
    updateSelectedDate: PropTypes.func.isRequired
  };

  render() {
    const {base, selectedDate, updateSelectedDate, moveToMonth} = this.props;

    return (
      <section className="calendar-area">
        <Header base={base} moveToMonth={moveToMonth} />
        <table className="calendar-table">
          <DayArea />
          <DateArea base={base} selectedDate={selectedDate} updateSelectedDate={updateSelectedDate} />
        </table>
      </section>
    );
  }
}

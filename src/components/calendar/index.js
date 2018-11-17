import React, {Component} from 'react';

import '../../static/css/calendar.css';
import DayArea from './dayArea';
import DateArea from './dateArea';
import Header from './header';
import PropTypes from 'prop-types';

export default class Index extends Component {
  static propTypes = {
    base: PropTypes.number,
    changeSelectedDate: PropTypes.func,
    changeDateBase: PropTypes.func,
    selectedDate: PropTypes.number
  };

  render() {
    const {base, changeDateBase, changeSelectedDate, selectedDate} = this.props;

    return (
      <section className="calendar-area">
        <Header base={base} changeDateBase={changeDateBase} />
        <table className="calendar-table">
          <DayArea />
          <DateArea base={base} selectedDate={selectedDate} changeSelectedDate={changeSelectedDate} />
        </table>
      </section>
    );
  }
}

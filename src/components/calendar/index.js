import React, {Component} from 'react';

import '../../static/css/calendar.css';
import DayArea from './dayArea';
import DateArea from './dateArea';
import Header from './header';

export default class Index extends Component {
  state = {
    base: 0
  };

  moveToMonth = (months) => {
    this.setState((state) => {
      return {
        base: state.base + months
      };
    });
  };

  render() {
    const {base} = this.state;

    return (
      <section className="calendar-area">
        <Header base={base} moveToMonth={this.moveToMonth} />
        <table>
          <DayArea />
          <DateArea base={base} />
        </table>
      </section>
    );
  }
}

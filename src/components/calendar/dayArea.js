import React, {Component} from 'react';
import _ from 'lodash';
import {DAYS} from '../../constant';

export default class DayArea extends Component {
  render() {
    return (
      <thead className="calendar-day-area">
        <tr>
          {_.map(DAYS, (day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

import React, {Component} from 'react';

export default class DayArea extends Component {
  render() {
    return (
      <thead className="calendar-day-area">
        <tr>
          <th>sun</th>
          <th>mon</th>
          <th>tue</th>
          <th>wed</th>
          <th>thu</th>
          <th>fri</th>
          <th>sat</th>
        </tr>
      </thead>
    );
  }
}

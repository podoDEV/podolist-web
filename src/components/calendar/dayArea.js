import React, {Component} from 'react';

export default class DayArea extends Component {
  render() {
    return (
      <thead className="calendar-day-area">
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
    );
  }
}

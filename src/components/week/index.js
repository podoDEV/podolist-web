import React, {Component} from 'react';
import _ from 'lodash';

export default class Index extends Component {
  renderDateItem() {
    return (
      <div className="week-date-item">
        <p className="day">mon</p>
        <p className="date">0</p>
      </div>
    );
  }

  render() {
    return (
      <section className="week-container">
        <button className="week-move-btn left">왼쪽</button>
        <div className="week-date-area">
          <div className="week-date-item">
            <p className="day">sun</p>
            <div className="date">
              <div className="red-pin" />1
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">mon</p>
            <div className="date">
              <div className="red-pin" />2
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">tue</p>
            <div className="date">
              <div className="red-pin" />3
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">wed</p>
            <div className="date">
              <div className="red-pin" />4
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">thu</p>
            <div className="date selected has">
              <div className="red-pin" />5
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">fri</p>
            <div className="date has">
              <div className="red-pin" />6
            </div>
          </div>
          <div className="week-date-item">
            <p className="day">sat</p>
            <div className="date">
              <div className="red-pin" />7
            </div>
          </div>
        </div>
        <button className="week-move-btn right">오른쪽</button>
      </section>
    );
  }
}

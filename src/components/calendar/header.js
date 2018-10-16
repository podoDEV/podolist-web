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

    return (
      <div className="calendar-header">
        <h2 className="year">{year}</h2>
        <div className="month">
          <button onClick={() => moveToMonth(-1)}>{'<'}</button>
          <span>{month}</span>
          <button onClick={() => moveToMonth(1)}>{'>'}</button>
        </div>
      </div>
    );
  }
}

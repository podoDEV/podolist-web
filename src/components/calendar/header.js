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
    const date = moment()
      .add(base, 'M')
      .format('YYYY년 MM월');

    return (
      <div className="calendar-header">
        <button onClick={() => moveToMonth(-12)}>{'<<'}</button>
        <button onClick={() => moveToMonth(-1)}>{'<'}</button>
        <span className="calendar-info">{date}</span>
        <button onClick={() => moveToMonth(1)}>{'>'}</button>
        <button onClick={() => moveToMonth(12)}>{'>>'}</button>
      </div>
    );
  }
}

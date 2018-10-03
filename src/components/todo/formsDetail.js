import React, {Component} from 'react';
import moment from 'moment';

// import PropTypes from 'prop-types';

export default class FormsDetail extends Component {
  static propTypes = {};

  state = {
    startDate: moment()
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div>
        <p>라벨</p>
        <p>달력</p>
      </div>
    );
  }
}

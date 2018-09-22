import React, {Component} from 'react';

import List from './list';
import Forms from './forms';
import {showOptions} from '../../constant';

export default class Index extends Component {
  state = {
    showOption: showOptions.ALL
  };

  onChangeFilter = (option) => {
    this.setState({
      showOption: option
    });
  };

  render() {
    return (
      <section className="container">
        <Forms onChangeFilter={this.onChangeFilter} showOption={this.state.showOption} />
        <List showOption={this.state.showOption} />
      </section>
    );
  }
}

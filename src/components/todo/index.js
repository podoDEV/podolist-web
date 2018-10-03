import React, {Component} from 'react';

import List from './list';
import Forms from './forms';
import FormsDetail from './formsDetail';
import Header from './header';
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
      <div className="wrap">
        <section className="container">
          <Header onChangeFilter={this.onChangeFilter} showOption={this.state.showOption} />
          <List showOption={this.state.showOption} />
          <Forms />
        </section>
        <section className="container">
          <FormsDetail />
        </section>
      </div>
    );
  }
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';

import List from './list';
import Forms from './forms';
import Calendar from '../calendar/index';
import Header from './header';
import {createTodo} from '../../actions/todo';

// getUnixTimeStamp = () => {
//   const {base, selectedDate} = this.state;
//   let v = moment()
//     .set('date', selectedDate)
//     .add(base, 'M')
//     .format('YYYY-MM-DD');
//   // console.log(moment().unix(v));
// };

class Index extends Component {
  static propTypes = {
    createTodo: PropTypes.func
  };

  state = {
    todoTitle: '',
    selectedPriority: 'medium',
    selectedDate: Number(moment().format('D')),
    base: 0
  };

  updateSelectedDate = (date) => {
    this.setState({
      selectedDate: date
    });
  };

  moveToMonth = (months) => {
    const {base} = this.state;

    if (base + months === 0) {
      this.setState({
        base: 0,
        selectedDate: Number(moment().format('D'))
      });
    } else {
      this.setState({
        base: base + months,
        selectedDate: 1
      });
    }
  };

  onChangeTodoTitle = (ev) => {
    this.setState({
      todoTitle: ev.target.value
    });
  };

  onClickAddBtn = () => {
    const {todoTitle: title, selectedPriority: priority, selectedDate, base} = this.state;

    let time = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY-MM-DD');

    if (title) {
      this.props.createTodo({
        title,
        priority,
        endedAt: moment(time).unix(),
        startedAt: moment(time).unix()
      });

      this.setState({
        todoTitle: ''
      });
    }
  };

  onClickPriorityBtn = (priority) => {
    this.setState({
      selectedPriority: priority
    });
  };

  render() {
    const {selectedPriority, todoTitle, base, selectedDate} = this.state;

    return (
      <div className="wrap">
        <Header />
        <div className="body-area">
          <section className="main-container">
            <Forms
              selectedPriority={selectedPriority}
              todoTitle={todoTitle}
              onClickPriorityBtn={this.onClickPriorityBtn}
              onClickAddBtn={this.onClickAddBtn}
              onChangeTodoTitle={this.onChangeTodoTitle}
            />
            <List />
          </section>
          <section className="side-container">
            <Calendar
              base={base}
              selectedDate={selectedDate}
              updateSelectedDate={this.updateSelectedDate}
              moveToMonth={this.moveToMonth}
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Index);

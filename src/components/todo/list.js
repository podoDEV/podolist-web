import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Item from './item';

import {fetchTodo} from '../../actions/todo';

class List extends Component {
  static propTypes = {
    fetchTodo: PropTypes.func,
    todos: PropTypes.array
  };

  componentDidMount() {
    this.props.fetchTodo();
  }

  render() {
    return (
      <div className="todo-list-container">
        <div className="today-list">
          <h2 className="title">오늘</h2>
          <ul className="todo-list">
            {this.props.todos.map((todo, idx) => (
              <Item todo={todo} key={idx} />
            ))}
          </ul>
          <h2 className="title">미완료된 일</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = {
  fetchTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

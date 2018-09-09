import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addTodo} from '../actions/todo';
import '../static/css/App.css';

class List extends Component {
  static propTypes = {
    addTodo: PropTypes.func,
    todos: PropTypes.array
  };

  state = {
    todo: ''
  };

  onChangeTodo = (ev) => {
    this.setState({
      todo: ev.target.value
    });
  };

  onClickAddBtn = () => {
    this.props.addTodo(this.state.todo);

    this.setState({
      todo: ''
    });
  };

  render() {
    return (
      <div className="container">
        <label htmlFor="todo">할일: </label>
        <input
          type="text"
          name="todo"
          value={this.state.todo}
          onChange={this.onChangeTodo}
        />
        <button onClick={this.onClickAddBtn}>추가하기</button>
        <div>
          {this.props.todos.map((todo, idx) => (
            <div key={idx}>{todo.content}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

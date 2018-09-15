import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Item from './item';

import {postTodo, fetchTodo} from '../../actions/todo';
import '../../static/css/App.css';

class List extends Component {
  static propTypes = {
    postTodo: PropTypes.func,
    fetchTodo: PropTypes.func,
    todos: PropTypes.array
  };

  state = {
    todo: ''
  };

  componentDidMount() {
    this.props.fetchTodo();
  }

  onChangeTodo = (ev) => {
    this.setState({
      todo: ev.target.value
    });
  };

  onClickAddBtn = () => {
    this.props.postTodo({
      description: this.state.todo
    });

    this.setState({
      todo: ''
    });
  };

  render() {
    return (
      <div className="container">
        <label htmlFor="todo">할일: </label>
        <input type="text" name="todo" value={this.state.todo} onChange={this.onChangeTodo} />
        <button onClick={this.onClickAddBtn}>추가하기</button>
        <div>
          {this.props.todos.map((todo, idx) => (
            <Item todo={todo} key={idx} />
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
  postTodo,
  fetchTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

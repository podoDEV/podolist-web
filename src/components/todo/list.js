import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Item from './item';

import {fetchTodo} from '../../actions/todo';
import {showOptions} from '../../constant';

class List extends Component {
  static propTypes = {
    fetchTodo: PropTypes.func,
    todos: PropTypes.object,
    showOption: PropTypes.string
  };

  componentDidMount() {
    this.props.fetchTodo();
  }

  render() {
    const {showOption} = this.props;
    const {UNFINISHED, FINISHED, ALL} = showOptions;

    return (
      <div className="todo-list-container">
        <ul className={`todo-list unfinished ${showOption !== FINISHED ? 'show' : 'hidden'}`}>
          {this.props.todos.unfinishedTodoList.map((todo, idx) => (
            <Item todo={todo} key={idx} />
          ))}
        </ul>
        <hr className={showOption === ALL ? 'show' : 'hidden'} />
        <ul className={`todo-list finished ${showOption !== UNFINISHED ? 'show' : 'hidden'}`}>
          {this.props.todos.finishedTodoList.map((todo, idx) => (
            <Item todo={todo} key={idx} />
          ))}
        </ul>
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

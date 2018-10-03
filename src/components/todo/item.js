import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeTodo, toggleIsCompletedTodo} from '../../actions/todo';
import {connect} from 'react-redux';

class Item extends Component {
  static propTypes = {
    todo: PropTypes.object,
    removeTodo: PropTypes.func,
    toggleIsCompletedTodo: PropTypes.func
  };

  state = {
    isReadyComponent: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          isReadyComponent: true
        };
      });
    }, 300);
  }

  render() {
    const {isReadyComponent} = this.state;
    const {id, title, isCompleted} = this.props.todo;

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isCompleted}
          onChange={() => this.props.toggleIsCompletedTodo(id, isCompleted)}
        />
        <div className={`todo-item-title ${isReadyComponent ? 'ready' : ''}`}>
          <span className="todo-title">{title}</span>
        </div>
        <button className="todo-remove-btn" onClick={() => this.props.removeTodo(id, isCompleted)}>
          X
        </button>
      </li>
    );
  }
}

const mapDispatchToProps = {
  removeTodo,
  toggleIsCompletedTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Item);

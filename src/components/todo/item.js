import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {changeTodoTitle, removeTodo, toggleTodoComplete} from '../../actions/todo';
import {connect} from 'react-redux';

class Item extends Component {
  state = {
    isEdit: false,
    todo: ''
  };

  static propTypes = {
    todo: PropTypes.object,
    removeTodo: PropTypes.func,
    changeTodoTitle: PropTypes.func,
    toggleTodoComplete: PropTypes.func
  };

  handleChangeCheckbox = (itemId, isCompleted) => {
    this.props.toggleTodoComplete(itemId, isCompleted);
  };

  handleClickRemoveButton = (itemId) => {
    this.props.removeTodo(itemId);
  };

  handleClickEditButton = (itemId) => {
    if (this.state.isEdit) {
      this.props.changeTodoTitle(itemId, this.state.todo);
      this.setState({
        isEdit: !this.state.isEdit,
        todo: ''
      });
    } else {
      this.setState({
        isEdit: !this.state.isEdit,
        todo: this.props.todo.title
      });
    }
  };

  onChangeTodo = (ev) => {
    this.setState({
      todo: ev.target.value
    });
  };

  render() {
    const {isEdit} = this.state;
    const {title, id, isCompleted} = this.props.todo;

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isCompleted}
          onChange={() => this.handleChangeCheckbox(id, isCompleted)}
        />
        {isEdit ? (
          <div className="todo-edit-input-div">
            <input className="todo-edit-input" type="text" value={this.state.todo} onChange={this.onChangeTodo} />
          </div>
        ) : (
          <span className="todo-title">{title}</span>
        )}
        <button className="todo-edit-btn" onClick={() => this.handleClickEditButton(id)}>
          수정
        </button>
        <button className="todo-remove-btn" onClick={() => this.handleClickRemoveButton(id)}>
          X
        </button>
      </li>
    );
  }
}

const mapDispatchToProps = {
  removeTodo,
  toggleTodoComplete,
  changeTodoTitle
};

export default connect(
  null,
  mapDispatchToProps
)(Item);

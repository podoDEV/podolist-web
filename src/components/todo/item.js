import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {priority} from '../../constant';
import {removeTodo, toggleIsCompletedTodo} from '../../actions/todo';
import finishedImg from '../../static/img/finished.png';

const priorityBorderClassMap = {
  [priority.MEDIUM]: 'medium-border',
  [priority.URGENT]: 'urgent-border',
  [priority.HIGH]: 'high-border',
  [priority.LOW]: 'low-border',
  [priority.NONE]: 'none-border'
};

class Item extends Component {
  static propTypes = {
    todo: PropTypes.object,
    removeTodo: PropTypes.func,
    toggleIsCompletedTodo: PropTypes.func
  };

  state = {
    isReadyComponent: false,
    isOpenActionMenu: false
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

  toggleOpenActionMenu = () => {
    this.setState((prevState) => ({isOpenActionMenu: !prevState.isOpenActionMenu}));
  };

  render() {
    const {isReadyComponent, isOpenActionMenu} = this.state;
    const {id, title, isCompleted, priority, dueAt} = this.props.todo;
    const dueDate = moment(dueAt * 1000).format('YYYY-MM-DD');

    return (
      <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
        <div className="basic-todo-info-div">
          <div
            className={`todo-checkbox ${priorityBorderClassMap[priority]}`}
            onClick={() => this.props.toggleIsCompletedTodo(id, isCompleted)}
          >
            <img src={finishedImg} className={isCompleted ? 'completed-img' : 'none'} />
          </div>
          <div className={`todo-item-title ${isReadyComponent ? 'ready' : ''}`}>
            <span className="todo-title">{title}</span>
          </div>
          {isCompleted ? (
            <button className="todo-remove-btn" onClick={() => this.props.removeTodo(id, isCompleted)} />
          ) : (
            <div className={`todo-action-div ${isOpenActionMenu ? 'opened' : ''}`}>
              <button className={`todo-edit-btn ${isOpenActionMenu ? 'opened' : 'none'}`} />
              <button className={`todo-remove-btn ${isOpenActionMenu ? 'opened' : 'none'}`} />
              <button className="todo-more-btn" onClick={this.toggleOpenActionMenu} />
            </div>
          )}
        </div>
        <div className="todo-item-date">
          <span className="todo-date">{dueDate}</span>
        </div>
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

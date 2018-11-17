import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {priority} from '../../constant';
import {removeTodo, toggleIsCompletedTodo} from '../../actions/todo';
import {setExistItemToForms, setIsOpenAdditionalForms, setOpenedContextMenuId} from '../../actions/forms';
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
    toggleIsCompletedTodo: PropTypes.func,
    itemId: PropTypes.number,
    setOpenedContextMenuId: PropTypes.func,
    setExistItemToForms: PropTypes.func,
    setIsOpenAdditionalForms: PropTypes.func,
    openedContextMenuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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

  toggleOpenActionMenu = () => {
    const {itemId, setOpenedContextMenuId, openedContextMenuId} = this.props;
    if (itemId === openedContextMenuId) {
      setOpenedContextMenuId(-1);
    } else {
      setOpenedContextMenuId(itemId);
    }
  };

  openEditForms = () => {
    const {setExistItemToForms, setOpenedContextMenuId, todo, setIsOpenAdditionalForms} = this.props;

    setExistItemToForms(todo);
    setIsOpenAdditionalForms(true);
    setOpenedContextMenuId(-1);
  };

  render() {
    const {isReadyComponent} = this.state;
    const {
      todo: {id, title, isCompleted, priority, endedAt},
      openedContextMenuId,
      itemId
    } = this.props;
    const endedDate = moment(endedAt * 1000).format('YYYY-MM-DD');
    const isOpenedContextMenu = openedContextMenuId === itemId;

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
            <div className="pure-remove-btn-div">
              <button className="todo-remove-btn" onClick={() => this.props.removeTodo(id, isCompleted)} />
            </div>
          ) : (
            <div className={`todo-action-div ${isOpenedContextMenu ? 'opened' : ''}`}>
              <button
                className={`todo-edit-btn ${isOpenedContextMenu ? 'opened' : 'none'}`}
                onClick={this.openEditForms}
              />
              <button
                className={`todo-remove-btn ${isOpenedContextMenu ? 'opened' : 'none'}`}
                onClick={() => this.props.removeTodo(id, isCompleted)}
              />
              <button className="todo-more-btn" onClick={this.toggleOpenActionMenu} />
            </div>
          )}
        </div>
        <div className="todo-item-date">
          <span className="todo-date">{endedDate}</span>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  openedContextMenuId: state.forms.openedContextMenuId
});

const mapDispatchToProps = {
  removeTodo,
  toggleIsCompletedTodo,
  setExistItemToForms,
  setOpenedContextMenuId,
  setIsOpenAdditionalForms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

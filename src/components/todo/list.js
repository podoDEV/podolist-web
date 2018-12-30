import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookies from 'js-cookie';
import _ from 'lodash';

import Item from './item';
import {fetchTodo} from '../../actions/todo';
import history from '../../browserHistory';

class List extends Component {
  static propTypes = {
    user: PropTypes.object,
    fetchTodo: PropTypes.func,
    todos: PropTypes.array,
    delayedTodos: PropTypes.array,
    selectedDate: PropTypes.number,
    base: PropTypes.number
  };

  state = {
    openDelayedItem: true,
    openedContextMenuId: 0
  };

  setOpenedContextMenuId = (id) => {
    this.setState({
      ...this.state,
      openedContextMenuId: id
    });
  };

  toggleDelayedItem = () => {
    this.setState((prevState) => ({
      openDelayedItem: !prevState.openDelayedItem
    }));
  };

  componentDidMount() {
    this.props.fetchTodo();
  }

  getDelayedListStyle = () => {
    const {openDelayedItem} = this.state;
    const {delayedTodos} = this.props;

    let foldStyle = {
      transition: 'height 0.3s',
      WebkitTransition: 'height 0.3s',
      height: '0px',
      overflow: 'hidden'
    };

    if (openDelayedItem) {
      const len = delayedTodos.length;

      foldStyle = {
        transition: 'height 0.4s',
        WebkitTransition: 'height 0.4s',
        height: `${58 * len}px`,
        overflow: 'hidden'
      };
    }

    return foldStyle;
  };

  render() {
    const {openDelayedItem} = this.state;
    const {base, selectedDate, todos, delayedTodos} = this.props;
    const date = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY.MM.DD');
    const today = moment().format('YYYY.MM.DD');
    const isToday = date === today;
    const isExistDelayedItem = delayedTodos.length > 0;

    return (
      <div className="todo-list-container">
        <div className="today-list">
          {isExistDelayedItem && (
            <React.Fragment>
              <div className="unfinished-title-div">
                <span className="title">Delayed</span>
                <button className={`fold-btn ${openDelayedItem ? '' : 'fold'}`} onClick={this.toggleDelayedItem} />
              </div>
              <ul className="todo-list" style={this.getDelayedListStyle()}>
                {delayedTodos.map((todo, idx) => (
                  <Item todo={todo} key={idx} itemId={todo.id} isDelayed={true} />
                ))}
              </ul>
              <hr className="dividing-line" />
            </React.Fragment>
          )}
          <div className="today-title-div">
            {isToday ? (
              <React.Fragment>
                <span className="title">Today</span>
                <span className="date">{date}</span>
              </React.Fragment>
            ) : (
              <span className="title">{date}</span>
            )}
          </div>
          <ul className="todo-list">
            {todos.map((todo, idx) => (
              <Item todo={todo} key={idx} itemId={todo.id} isDelayed={false} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
  todos: state.todos.items,
  delayedTodos: state.todos.delayedItems,
  selectedDate: state.today.selectedDate,
  base: state.today.base
});

const mapDispatchToProps = {
  fetchTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

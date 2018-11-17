import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import Item from './item';
import {fetchTodo} from '../../actions/todo';

class List extends Component {
  static propTypes = {
    fetchTodo: PropTypes.func,
    todos: PropTypes.array,
    selectedDate: PropTypes.number,
    base: PropTypes.number
  };

  state = {
    openDelayedItem: false,
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
    const {todos} = this.props;

    let foldStyle = {
      transition: 'height 0.3s',
      WebkitTransition: 'height 0.3s',
      height: '0px',
      overflow: 'hidden'
    };

    if (openDelayedItem) {
      const len = todos.length;

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
    const {base, selectedDate} = this.props;
    const today = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY.MM.DD');

    return (
      <div className="todo-list-container">
        <div className="today-list">
          {/*delayed item 존재 시 에만 그림*/}
          <div className="unfinished-title-div">
            <span className="title">Delayed</span>
            <button className={`fold-btn ${openDelayedItem ? '' : 'fold'}`} onClick={this.toggleDelayedItem} />
          </div>
          <ul className="todo-list" style={this.getDelayedListStyle()}>
            {/*{this.props.todos.map((todo, idx) => (*/}
            {/*<Item*/}
            {/*todo={todo}*/}
            {/*key={idx}*/}
            {/*itemId={`delayed_` + idx}*/}
            {/*setOpenedContextMenuId={this.setOpenedContextMenuId}*/}
            {/*openedContextMenuId={this.state.openedContextMenuId}*/}
            {/*/>*/}
            {/*))}*/}
          </ul>
          {/*delayed item 존재 시 에만 그림*/}
          <hr className="dividing-line" />
          <div className="today-title-div">
            <span className="title">Today</span>
            <span className="date">{today}</span>
          </div>
          <ul className="todo-list">
            {this.props.todos.map((todo, idx) => (
              <Item todo={todo} key={idx} itemId={todo.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
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

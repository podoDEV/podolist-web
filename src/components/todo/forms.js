import React, {Component} from 'react';
import {createTodo} from '../../actions/todo';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Forms extends Component {
  static propTypes = {
    createTodo: PropTypes.func,
    onChangeFilter: PropTypes.func,
    showOption: PropTypes.string
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
    const title = this.state.todo;

    if (title) {
      this.props.createTodo({
        title: title
      });

      this.setState({
        todo: ''
      });
    }
  };

  render() {
    return (
      <section>
        <div className="forms-area">
          <input
            type="text"
            name="todo"
            value={this.state.todo}
            onChange={this.onChangeTodo}
            className="forms-area-input"
          />
          <button onClick={this.onClickAddBtn} className="forms-area-btn">
            +
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  createTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Forms);

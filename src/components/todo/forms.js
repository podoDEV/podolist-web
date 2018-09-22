import React, {Component} from 'react';
import {postTodo} from '../../actions/todo';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {showOptions} from '../../constant';

const {ALL, FINISHED, UNFINISHED} = showOptions;

class Forms extends Component {
  static propTypes = {
    postTodo: PropTypes.func,
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
      this.props.postTodo({
        title: title
      });

      this.setState({
        todo: ''
      });
    }
  };

  render() {
    const {onChangeFilter, showOption} = this.props;

    return (
      <header>
        <div className="forms-area">
          <input type="text" name="todo" value={this.state.todo} onChange={this.onChangeTodo} />
          <button onClick={this.onClickAddBtn}>추가하기</button>
        </div>
        <div className="filter-area">
          <button className={`filter-btn ${showOption === ALL ? 'active' : ''}`} onClick={() => onChangeFilter(ALL)}>
            전체
          </button>
          <button
            className={`filter-btn ${showOption === UNFINISHED ? 'active' : ''}`}
            onClick={() => onChangeFilter(UNFINISHED)}
          >
            미완료
          </button>
          <button
            className={`filter-btn ${showOption === FINISHED ? 'active' : ''}`}
            onClick={() => onChangeFilter(FINISHED)}
          >
            완료
          </button>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = {
  postTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Forms);

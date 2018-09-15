import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeTodo} from '../../actions/todo';
import {connect} from 'react-redux';

class Item extends Component {
  static propTypes = {
    todo: PropTypes.object,
    description: PropTypes.string,
    itemId: PropTypes.number,
    removeTodo: PropTypes.func
  };

  // state = {”
  // };

  // componentDidMount() {
  // }

  handleClickRemoveButton = (itemId) => {
    this.props.removeTodo(itemId);
  };

  render() {
    const {description, itemId} = this.props.todo;

    return (
      <div className="container">
        <input type="checkbox" />
        <span>
          {itemId}: {description}
        </span>
        <button onClick={() => this.handleClickRemoveButton(itemId)}>삭제</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  removeTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Item);

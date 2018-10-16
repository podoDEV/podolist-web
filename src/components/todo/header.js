import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="todo-header">
        <div className="logo-area">
          <Link to="/">Podolist</Link>
        </div>
        <div className="search-area">
          <input type="text" className="search-bar" />
        </div>
      </header>
    );
  }
}

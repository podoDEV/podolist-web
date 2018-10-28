import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Week from '../week/index';

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <header className="todo-header">
          <div className="logo-area">
            <Link to="/">Podolist</Link>
          </div>
          <div className="search-area">
            <input type="text" className="search-bar" />
          </div>
        </header>
        <Week />
      </div>
    );
  }
}

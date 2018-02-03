import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/pure-min.css';
import './css/side-menu.css';

export default class App extends Component {
  render() {
    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu">
            <Link className="pure-menu-heading" to="/">Company</Link>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link to="/" className="pure-menu-link">Home</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/autores" className="pure-menu-link">Autor</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/livros" className="pure-menu-link">Livros</Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="main">
          <div className="header">
            <h1>Bem vindo ao sistema</h1>
          </div>
          <div className="content" id="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

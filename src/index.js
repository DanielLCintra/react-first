import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './modules/dashboard/index';
import registerServiceWorker from './registerServiceWorker';
import Autores from './modules/autores/index';
import Livros from './modules/livros/index';

ReactDOM.render(
  (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/autores" component={Autores} />
          <Route path="/livros" component={Livros} />
        </Switch>
      </App>
    </Router>
  ),
  document.getElementById('root'),
);
registerServiceWorker();

import React from 'react';
import {render} from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import browserHistory from './browserHistory';
import store, {sagaMiddleware} from './store';
import sagas from './sagas';

import './static/css/reset.css';
import './static/css/index.css';

import Login from './components/login';
import TodoIndex from './components/todo/index';
import Privacy from './components/privacy';

sagaMiddleware.run(sagas);

render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={TodoIndex} />
        <Route path="/login" component={Login} />
        <Route path="/ko/privacy" component={Privacy} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

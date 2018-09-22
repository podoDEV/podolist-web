import {createStore, applyMiddleware, compose} from 'redux';
import ReduxFreeze from 'redux-freeze';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const initialState = {
  todos: {
    unfinishedTodoList: [],
    finishedTodoList: []
  }
};

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  enhancer = composeEnhancers(applyMiddleware(...middlewares, ReduxFreeze));
} else {
  enhancer = applyMiddleware(...middlewares);
}

const store = createStore(reducers, initialState, enhancer);

export default store;

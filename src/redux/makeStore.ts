import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./saga";

export default function makeStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const enhancer =
    process.env.NODE_ENV === "production" // eslint-disable-line no-undef
      ? compose(applyMiddleware(sagaMiddleware))
      : composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(reducer, initialState, enhancer);

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

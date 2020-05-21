import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers/createRootReducer';

export default (initialState = {}) => {
  const middleware = [thunk];
  const enhancers = [];
  let composeEnhancers = compose;

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers/createRootReducer', () => {
      const updatedCreateReducers = require('../reducers/createRootReducer').default;
      store.replaceReducer(updatedCreateReducers(store.asyncReducers));
    });
  }

  return store;
};

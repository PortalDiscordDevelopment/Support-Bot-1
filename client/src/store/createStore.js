/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

import { combineReducers } from 'redux';
import { KEY_REDUCER as KEY_CORE, reducer as coreReducer } from '../core';
import { KEY_REDUCER as KEY_DASHBOARD, reducer as dashboardReducer } from '../dashboard';

const createRootReducer = (asyncReducers: any) => combineReducers({
  ...asyncReducers,
  [KEY_CORE]: coreReducer,
  [KEY_DASHBOARD]: dashboardReducer,
});

export default createRootReducer;

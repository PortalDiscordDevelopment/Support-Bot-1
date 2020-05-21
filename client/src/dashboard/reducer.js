import { handleActions } from "redux-actions";
import * as storeKeys from "./storeKeys";
import * as actions from "./actionCreators";

const initialState = {
  [storeKeys.KEY_AVAILABLE_GUILDS]: [],
  [storeKeys.KEY_OPEN_TICKETS]: [],
  [storeKeys.KEY_MESSAGES]: [],
  [storeKeys.KEY_CURRENT_TICKET]: undefined
};

export default handleActions(
  {
    [actions.SET_AVAILABLE_GUILDS]: (state, action) => ({
      ...state,
      [storeKeys.KEY_AVAILABLE_GUILDS]: action.payload.guilds
    }),
    [actions.SET_OPEN_TICKETS]: (state, action) => ({
      ...state,
      [storeKeys.KEY_OPEN_TICKETS]: action.payload.tickets
    }),
    [actions.SET_MESSAGES]: (state, action) => ({
      ...state,
      [storeKeys.KEY_MESSAGES]: action.payload.messages
    }),
    [actions.SET_CURRENT_TICKET]: (state, action) => ({
      ...state,
      [storeKeys.KEY_CURRENT_TICKET]: action.payload.ticket
    }),
  },
  initialState
);

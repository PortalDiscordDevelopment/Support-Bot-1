import { handleActions } from "redux-actions";
import * as storeKeys from "./storeKeys";
import * as actions from "./actionCreators";

const initialState = {
  [storeKeys.KEY_AUTH_TOKEN]: "",
  [storeKeys.KEY_AUTH_USER]: undefined,
};

export default handleActions(
  {
    [actions.SET_AUTH_TOKEN]: (state, action) => ({
      ...state,
      [storeKeys.KEY_AUTH_TOKEN]: action.payload.token
    }),
    [actions.SET_AUTH_USER]: (state, action) => ({
      ...state,
      [storeKeys.KEY_AUTH_USER]: action.payload.user
    }),
  },
  initialState
);

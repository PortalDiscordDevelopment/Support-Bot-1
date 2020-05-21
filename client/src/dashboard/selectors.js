import { createSelector } from "reselect";
import * as storeKeys from "./storeKeys";

const root = (state: any) => state[storeKeys.KEY_ROOT];

export const guilds = createSelector(
  root,
  state => state[storeKeys.KEY_AVAILABLE_GUILDS]
);

export const tickets = createSelector(
  root,
  state => state[storeKeys.KEY_OPEN_TICKETS]
);

export const currentTicket = createSelector(
  root,
  state => state[storeKeys.KEY_CURRENT_TICKET]
);

export const messages = createSelector(
  root,
  state => state[storeKeys.KEY_MESSAGES]
);


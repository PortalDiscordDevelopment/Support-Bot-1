import { createSelector } from "reselect";
import * as storeKeys from "./storeKeys";

const root = (state: any) => state[storeKeys.KEY_ROOT];

export const token = createSelector(
  root,
  state => state[storeKeys.KEY_AUTH_TOKEN]
);

export const user = createSelector(
  root,
  state => state[storeKeys.KEY_AUTH_USER]
);

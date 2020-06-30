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

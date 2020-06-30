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

import { createAction } from "redux-actions";
import CoreApiClient from "./CoreApiClient";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_AUTH_USER = "SET_AUTH_USER";

export const setToken = (token: string) =>
  async (dispatch: any) => {
    localStorage.setItem("token", token);
    await dispatch(createAction(SET_AUTH_TOKEN)({ token }));
    await dispatch(setUser());
  };

export const setUser = () => 
  async (dispatch: any) => {
    const user = await CoreApiClient.getMe();
    await dispatch(createAction(SET_AUTH_USER)({ user }));
  }

export const logout = () =>
  async (dispatch: any) => {
    localStorage.removeItem("token");
    await dispatch(createAction(SET_AUTH_TOKEN)({ token: "" }));
  };

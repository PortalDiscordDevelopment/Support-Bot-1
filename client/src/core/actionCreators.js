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

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
import io from 'socket.io-client';
import { CoreApiClient, actionCreators as coreActionCreators, selectors as coreSelectors } from "../core";

export const SET_AVAILABLE_GUILDS = "SET_AVAILABLE_GUILDS";
export const SET_OPEN_TICKETS = "SET_OPEN_TICKETS";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_CURRENT_TICKET = "SET_CURRENT_TICKET";

let _socket: any;

export const fetchAvailableGuilds = () =>
  async (dispatch: any) => {
    try {
      const guilds = await CoreApiClient.getAvailableGuilds();
      await dispatch(createAction(SET_AVAILABLE_GUILDS)({ guilds }));
    } catch (e) {
      await dispatch(coreActionCreators.logout());
    }
  };

export const initSocketHandler = (guildId: string) =>
  async (dispatch: any, getState: any) => {
    if(_socket) {
      _socket.disconnect();
      await dispatch(clear());
    }

    const user = coreSelectors.user(getState());

    _socket = io(`${window.location.origin}?guild=${guildId}&agent=${user.username}`);
    
    _socket.on("tickets", async ({ tickets }) => {
        await dispatch(createAction(SET_OPEN_TICKETS)({ tickets }));
    });

    _socket.on("messages", async ({ messages }) => {
      await dispatch(createAction(SET_MESSAGES)({ messages }));
    });

    _socket.on("ticket-closed", async () => {
      await dispatch(disconnectChannel());
    });
  };

export const connectChannel = (ticket: any) =>
  async (dispatch: any) => {
    if(_socket) {
      _socket.emit("connect-channel", {
        channelId: ticket.id
      });
      await dispatch(createAction(SET_CURRENT_TICKET)({ ticket }));
    }
  };

export const disconnectChannel = (channelId: string) =>
  async (dispatch: any) => {
    if(_socket) {
      _socket.emit("disconnect-channel");
      await dispatch(createAction(SET_CURRENT_TICKET)({ ticket: undefined }));
      await dispatch(createAction(SET_MESSAGES)({ messages: [] }));
    }
  };

export const sendMessage = (message: string) =>
  async (dispatch: any) => {
    if(_socket) {
      _socket.emit("send-message", {
        message
      });
    }
  };

export const closeTicket = () =>
  async (dispatch: any) => {
    if(_socket) {
      _socket.emit("close-ticket");
    }
  };

export const clear = () =>
  async (dispatch: any) => {
    await dispatch(createAction(SET_OPEN_TICKETS)({ tickets: [] }));
    await dispatch(createAction(SET_CURRENT_TICKET)({ ticket: undefined }));
    await dispatch(createAction(SET_MESSAGES)({ messages: [] }));
  };

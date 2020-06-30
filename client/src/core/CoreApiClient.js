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

import { superagent } from '../utils';
import authenticatedRequest from "./authenticatedRequest";

class CoreApiClient {

  static async getAvailableGuilds(): Promise<Object> {
    return authenticatedRequest(
      superagent
        .get(`${this._baseUrl()}/guilds`)
    ).then((res: any) => res.body);
  }

  static async getMe(): Promise<Object> {
    return authenticatedRequest(
      superagent
        .get(`${this._baseUrl()}/me`)
    ).then((res: any) => res.body);
  }

  static _baseUrl(): string {
    return `${window.location.origin}/api`;
  }
}

export default CoreApiClient;

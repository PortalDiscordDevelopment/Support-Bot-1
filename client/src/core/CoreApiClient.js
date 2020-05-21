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

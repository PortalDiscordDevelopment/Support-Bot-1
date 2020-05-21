const fetch = require('node-fetch');

class DiscordApiClient {

    static getGuilds(token) {
        return fetch(`${this._baseUrl()}/users/@me/guilds`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(json => json);
    }

    static getMe(token) {
        return fetch(`${this._baseUrl()}/users/@me`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(json => json);
    }

    static _baseUrl() {
        return "https://discord.com/api/v6";
    }

}

module.exports = DiscordApiClient;
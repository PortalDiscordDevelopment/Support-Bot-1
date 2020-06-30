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

const Metadata = require("../utils/Metadata");

class SocketHandler {

    _socket;
    _guildId;
    _discordClient;

    constructor(socket, guildId, discordClient) {
        this._socket = socket;
        this._guildId = guildId;
        this._discordClient = discordClient;
    }

    _addSocketListener = (event, listener) => {
        this._socket.on(event, listener);
    }

    _addDiscordEventListener = (event, listener) => {
        this._discordClient.on(event, listener)
    }

    _getTicketMetadata = (channel) => {
        const messages = channel.messages.cache.array();
        for (const message of messages.reverse()) {
            if (Metadata.isMetadata(message.content)) {
                const parsed = Metadata.parse(message.content);
    
                if (parsed.guild === this._guildId) {
                    return parsed;
                }
            }
        }
        return false;
    }

    _onDiscordPrivateTicketMessage = (callback) => {
        this._discordClient.on("message", msg => {
            if (msg.channel.guild) return;

            if (this._getTicketMetadata(msg.channel)) {
                callback(msg);
            }
        });
    }

    _sendMessage = async (message) => {
        if (this._channelId) {
            const channel = this._discordClient.channels.resolve(this._channelId);
            await channel.send(message);
        }
    }
}

module.exports = SocketHandler;
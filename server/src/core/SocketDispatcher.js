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

const TicketsSocketHandler = require("./TicketsSocketHandler");
const ChatSocketHandler = require("./ChatSocketHandler");

class SocketDispatcher {
    static onConnected(socket, discordClient) {
        const { guild } = socket.handshake.query;
        if (!guild) {
            socket.disconnect();
            return;
        }
        
        new SocketDispatcher(socket, guild, discordClient).setupClientStack();
    }

    _socket;
    _guildId;
    _discordClient;

    _socketHandlers = [];

    constructor(socket, guildId, discordClient) {
        this._socket = socket;
        this._guildId = guildId;
        this._discordClient = discordClient;
    }

    setupClientStack() {
        console.log('A user connected');

        this._socketHandlers.push(new TicketsSocketHandler(this._socket, this._guildId, this._discordClient));
        this._socketHandlers.push(new ChatSocketHandler(this._socket, this._guildId, this._discordClient))

        this._socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    }
}

module.exports = SocketDispatcher;
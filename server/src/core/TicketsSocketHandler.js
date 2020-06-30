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

const SocketHandler = require("./SocketHandler");

class TicketsSocketHandler extends SocketHandler {

    _tickets = [];

    constructor(...args) {
        super(...args);

        this._init();

        this._onDiscordPrivateTicketMessage(message => {
            this._handleDispatchGuildTickets(message.channel);
        });
    }

    _init = async () => {
        const DMChannelIds = Array.from(this._discordClient.channels.cache.filter(channel => channel.type === "dm").keys());
        for (const DMChannelId of DMChannelIds) {
            const channel = await this._discordClient.channels.fetch(DMChannelId);
            if (this._getTicketMetadata(channel)) {
                this._handleDispatchGuildTickets(channel);
            }
        }
    }

    _handleDispatchGuildTickets = (channel) => {
        const author = this._discordClient.users.resolve(channel.recipient);
        if (author) {
            channel.recipient = author.username;
            channel.authorID = author.id;
        }
        if (this._tickets.findIndex(_channel => _channel.id === channel.id) !== -1) {
            const tmp = [];
            for (const ticket of this._tickets) {
                if (ticket.id !== channel.id) tmp.push(channel);
            }
            this._tickets = tmp;
        }

        this._tickets.push({
            ...channel.toJSON(),
            ticketId: this._getTicketMetadata(channel).ticket,
            lastMessage: channel.lastMessage.toJSON(),
            status: this._getTicketMetadata(channel).action
        });
        this._socket.emit("tickets", {
            tickets: this._tickets
        });
    }
}

module.exports = TicketsSocketHandler;
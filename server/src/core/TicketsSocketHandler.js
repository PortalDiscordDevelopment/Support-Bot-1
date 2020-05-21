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
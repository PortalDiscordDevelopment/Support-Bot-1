const SocketHandler = require("./SocketHandler");
const Metadata = require("../utils/Metadata");

class ChatSocketHandler extends SocketHandler {

    _channelId = undefined;

    constructor(...args) {
        super(...args);

        this._addSocketListener("connect-channel", ({ channelId }) => {
            this._channelId = channelId;
            this._handleDispatchAllMessages();
        });

        this._addSocketListener("disconnect-channel", () => {
            this._channelId = undefined;
        });

        this._addSocketListener("send-message", this._handleSendMessage);

        this._addSocketListener("close-ticket", this._handleCloseTicket);

        this._onDiscordPrivateTicketMessage(this._handleDispatchNewMessage);
    }

    _handleDispatchNewMessage = (message) => {
        if (this._channelId === message.channel.id) {
            const messages = message.channel.messages.cache.array();

            this._socket.emit("messages", {
                messages
            });
        }
    }

    _handleSendMessage = async ({ message }) => {
        await this._sendMessage(`**${this._socket.handshake.query.agent} :** ${message}`);
    };

    _handleDispatchAllMessages = () => {
        if (this._channelId) {
            const channel = this._discordClient.channels.resolve(this._channelId);
            this._socket.emit("messages", {
                messages: channel.messages.cache.array()
            });
        }
    };

    _handleCloseTicket = async () => {
        const channel = this._discordClient.channels.resolve(this._channelId);

        const metadata = {
            guild: this._guildId,
            ticket: this._getTicketMetadata(channel).ticket,
            action: "close"
        };

        await this._sendMessage(Metadata.generate(metadata));
        await this._sendMessage(`__**Ticket closed by agent**__\nFurther messages will get lost, please open a new ticket if needed.`);

        await channel.delete();

        this._socket.emit("ticket-closed");
    }
}

module.exports = ChatSocketHandler;
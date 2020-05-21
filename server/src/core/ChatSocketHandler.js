const SocketHandler = require("./SocketHandler");

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

    _handleSendMessage = ({ message }) => {
        if (this._channelId) {
            const channel = this._discordClient.channels.resolve(this._channelId);
            channel.send(`**${this._socket.handshake.query.agent} :** ${message}`);
        }
    };

    _handleDispatchAllMessages = () => {
        if (this._channelId) {
            const channel = this._discordClient.channels.resolve(this._channelId);
            this._socket.emit("messages", {
                messages: channel.messages.cache.array()
            });
        }
    };
}

module.exports = ChatSocketHandler;
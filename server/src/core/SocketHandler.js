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
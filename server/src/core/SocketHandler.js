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

    _isCorrectGuild = (channel, returnTicketId) => {
        const messages = channel.messages.cache.array();
        for (const message of messages) {
            if (message.content.match(/[||{{].*[}}||]/g)) {
                const msg = message.content;
                const payload = msg.split('{{')[1].split('}}')[0];
                const values = payload.split("&");
                const json = {};
                values.forEach(value => json[value.split("=")[0]] = value.split("=")[1]);
    
                if (json.guild === this._guildId) {
                    if (returnTicketId) {
                        return json.ticket;
                    }
                    return true;
                }
            }
        }
    }

    _onDiscordPrivateTicketMessage = (callback) => {
        this._discordClient.on("message", msg => {
            if (msg.channel.guild) return;

            if (this._isCorrectGuild(msg.channel)) {
                callback(msg);
            }
        });
    }
}

module.exports = SocketHandler;
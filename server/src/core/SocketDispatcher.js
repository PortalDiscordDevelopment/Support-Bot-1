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
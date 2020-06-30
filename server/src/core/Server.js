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

const path = require('path');
const express = require('express');
const app = express();
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, { origins: '*:*' });

const SocketDispatcher = require("./SocketDispatcher");

const ApiRoute = require("../routes/ApiRoute");

class Server {

    _discordClient;

    constructor(discordClient) {
        this._discordClient = discordClient;
    }

    start() {
        this.registerMiddleware();
        this.registerRoutes();

        // Start rest server
        let port = process.env.PORT || 4000;
        http.listen(port, () => {
            console.log('Rest server started on port ' + port);
        });

        // Start websocket
        io.on('connection', async (socket) => SocketDispatcher.onConnected(socket, this._discordClient));
        console.log("Websocket listening !");
    }

    registerMiddleware() {
        app.use(bearerToken());
        app.use(cors());
        app.use(express.static(path.join(__dirname, '/../../../build')));
    }

    registerRoutes() {
        const ApiRoutes = new ApiRoute(this._discordClient);

        app.use('/api', ApiRoutes.setup());
        app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../../../build/index.html`)));
    }
} 

module.exports = Server;
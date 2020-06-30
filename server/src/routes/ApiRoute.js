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

const Route = require("./Route");
const DiscordApiClient = require("../core/DiscordApiClient");

class ApiRoute extends Route {

    setup() {
        this._router.get('/', (req, res) => {
            res.send("Hello world !");
        });

        this._router.get('/guilds', async (req, res) => {
            try {
                const guilds = await DiscordApiClient.getGuilds(req.token);

                // message present => error
                if (guilds.message) throw new Error(JSON.stringify(guilds));

                const tmp = [];
                guilds.forEach(guild => {
                    if (this._discordClient.guilds.resolve(guild.id)) {
                        if (guild.permissions === 2147483647) { // if is admin
                            tmp.push(guild);
                        }
                    }
                });
    
                return res.json(tmp);
            } catch (e) {
                res.json(JSON.parse(e.message));
            }
        });

        this._router.get('/me', async (req, res) => {
            try {
                const me = await DiscordApiClient.getMe(req.token);
                return res.json(me);
            } catch (e) {
                res.json(JSON.parse(e.message));
            }
        });

        return this._router;
    }
}

module.exports = ApiRoute;
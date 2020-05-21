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
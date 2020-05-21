const express = require('express');
const router = express.Router();

class Route {

    _discordClient;
    _router;

    constructor(discordClient) {
        this._discordClient = discordClient;
        this._router = router;
    }

    setup() {
        this._router.get('/', function(req, res) {
            res.send("Hello world !");
        });

        return this._router;
    }

}

module.exports = Route;
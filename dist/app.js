"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const core_1 = require("@overnightjs/core");
const express = require("express");
const bodyParser = require("body-parser");
const Controllers = require("./src/index");
const config_1 = require("./config");
const morgan = require("morgan");
const db_1 = require("./db");
class App extends core_1.Server {
    constructor() {
        super(true);
        this.corsPolicy();
        this.setUpMiddleWares();
        this.setUpControllers();
        db_1.Db.connect();
    }
    corsPolicy() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization, Client-Type");
            next();
        });
    }
    setUpMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('client'));
        this.app.use(morgan('dev'));
    }
    setUpControllers() {
        const controllers = [];
        Object.keys(Controllers).forEach(key => {
            const controller = Controllers[key];
            controllers.push(new controller());
        });
        this.addControllers(controllers);
    }
    start() {
        this.app.listen(config_1.default.port, config_1.default.host, () => {
            console.log('Server is running on ' + config_1.default.host + ':' + config_1.default.port);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map
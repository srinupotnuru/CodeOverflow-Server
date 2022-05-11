"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.port = process.env.PORT || 8000;
        this.host = process.env.HOST || 'localhost';
        this.dbusername = process.env.dbusername || '';
        this.dbpassword = process.env.dbpassword || '';
        this.dbhost = process.env.dbhost || 'localhost';
        this.dbname = process.env.dbname || 'codeOverFlow';
        this.RAPID_API_KEY = process.env.RAPID_API_KEY || '';
        this.EMAIL_APP_KEY = process.env.EMAIL_APP_KEY || '';
    }
    get config() {
        return this;
    }
}
exports.default = new Config().config;
//# sourceMappingURL=config.js.map
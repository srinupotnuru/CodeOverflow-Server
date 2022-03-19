class Config {
    private readonly port = process.env.PORT || 8000;
    private readonly host = process.env.HOST || 'localhost';
    private dbusername = process.env.dbusername || '';
    private dbpassword = process.env.dbpassword || '';
    private dbhost = process.env.dbhost || 'localhost';
    private dbname = process.env.dbname || 'codeOverFlow';
    private jdoodleClientID = process.env.JDOODLE_CLIENT_ID || '';
    private jdoodleSecret = process.env.JDOODLE_CLIENT_SECRET || '';
    public get config(): any {
        return this;
    }
}

export default new Config().config;
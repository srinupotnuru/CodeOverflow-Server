class Config {
    private readonly port = process.env.PORT || 8000;
    private readonly host = process.env.HOST || 'localhost';
    private dbusername = process.env.dbusername || '';
    private dbpassword = process.env.dbpassword || '';
    private dbhost = process.env.dbhost || 'localhost';
    private dbname = process.env.dbname || 'codeOverFlow';
    private RAPID_API_KEY = process.env.RAPID_API_KEY || '';
    private EMAIL_APP_KEY = process.env.EMAIL_APP_KEY || '';
    public get config(): any {
        return this;
    }
}

export default new Config().config;
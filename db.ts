import  config from './config';
import * as mongoose from 'mongoose';

//export class Db {

let dbUrl = 'mongodb://' + config.dbhost + '/' + config.dbname,
opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //autoReconnect: true,
 //   reconnectInterval: 5000,
   // reconnectTries: Number.MAX_VALUE,
    useFindAndModify: false,
    useCreateIndex: true
};

    
export const connect  = async (opts) => {
    mongoose.connection.on('connected', () => { console.log(`Db connected to ${config.dbhost} with user ${config.dbusername}`); });
    mongoose.connection.on('close', () => { console.log('lost Db connection'); });
    mongoose.connection.on('reconnected', () => { console.log('Db reconnected'); });
    mongoose.connection.on('error', () => { console.log('Db connection error'); });
    await mongoose.connect(dbUrl, opts);
}

export const close = () => {
    mongoose.connection.close();
}
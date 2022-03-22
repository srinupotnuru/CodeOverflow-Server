import { Server } from '@overnightjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Controllers from './src/index';
import config from './config';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import * as path from 'path';
import * as cors from 'cors';
import * as mongo from './db';
export class App extends Server {
    constructor() {
        super(true);
        this.corsPolicy();
        this.setUpMiddleWares();
        this.setUpControllers();  
        mongo.connect({
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });      
    }
    private corsPolicy() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization, Client-Type");
            next();
        });
    }
    setUpMiddleWares(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
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

    public start(){
        this.app.listen(config.port, config.host, ()=>{
            console.log('Server is running on '+ config.host + ':' + config.port);
        })
    }
}
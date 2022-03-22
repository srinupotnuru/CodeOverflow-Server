import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import {compile} from '../services/compile.service';
import axios from 'axios';
import * as request from '../../node_modules/request'
@Controller('compile')
export class CompilerController{

    @Post('compile')
    async compile(req: Request, res: Response) {
        try {
            console.log(req.body)
            const headers = { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" }
            const data = await axios.post('https://api.jdoodle.com/v1/execute',req.body ,{headers:headers})
            return res.status(200).send({
                message: 'Register successfull.',
                success: true,
                data: ""
            });
        } catch (error) {
           console.log(error.data);
        } 
            
    }
}


import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import {User} from '../models/user.model';
import {register , login} from '../services/auth.service';
@Controller('auth')
export class AuthenticationController {

    @Post('register')
    async register(req: Request, res: Response) {
        try {
            const data = await register(req.body);
            console.log(data);
            return res.status(200).send({
                message: 'Register successfull.',
                success: true,
                data: data
            });
    
            
        }catch(e) {
            return res.status(200).send({
                message: e,
                success: false,
            });
        }
       
    }
    @Post('login')
    async login(req: Request, res: Response) {
        try{
            const data = await login(req.body);
            return res.status(200).send({
                message: 'Login successfull.',
                success: true,
                data: data
            });

        }
        catch(e)
        {
            return res.status(200).send({
                message: e,
                success: false,
            });
        }
    }

}
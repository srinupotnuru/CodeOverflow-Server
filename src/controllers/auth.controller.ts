import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import {User} from '../models/user.model';
import {register , login, registerUser} from '../services/auth.service';
@Controller('auth')
export class AuthenticationController {

    @Post('register')
    async register(req: Request, res: Response) {
        try {
            const data = await register(req.body);
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

    @Post('verify-otp')
    async registerUser(req: Request, res: Response){
        try{
            let userRegistrationStatus: string = await registerUser(req.body);
            return res.status(200).send({
                message:'Verification Process is Done',
                success:true,
                data:userRegistrationStatus
            })
        }
        catch(e){
            return res.status(200).send({
                message:e,
                success:false,
            })
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
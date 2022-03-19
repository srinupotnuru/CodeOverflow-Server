import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import {compile} from '../services/compile.service';
@Controller('compile')
export class CompilerController{

    @Post('compile')
    async compile(req: Request, res: Response) {
        try {
            const data = await compile();
            console.log(data)
            return res.status(200).send({
                message: 'Compilation successfull.',
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

}
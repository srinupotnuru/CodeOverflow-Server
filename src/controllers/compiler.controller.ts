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

            const options:any = {
                method: 'POST',
                url: 'https://judge0-ce.p.rapidapi.com/submissions',
                params: {base64_encoded: 'true', fields: '*'},
                headers: {
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': 'c47b528b82msh498ca3ebc8b9535p169e3ejsn290b3ebe2398'
                },
                data: req.body
              };
              const token:any = await axios.request(options)
              console.log(token)
              const submissionOptions:any = {
                    method: 'GET',
                    url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token.data.token,
                    params: {base64_encoded: 'true', fields: '*'},
                    headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': 'c47b528b82msh498ca3ebc8b9535p169e3ejsn290b3ebe2398'
                    }
                };
            const submission = await axios.request(submissionOptions)
            console.log(submission.data)
            return res.status(200).send({
                message: 'Register successfull.',
                success: true,
                data: submission.data
            });

        
        } catch (error) {
           console.log(error);
        } 
            
    }
}


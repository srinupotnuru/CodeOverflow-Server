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
                    'X-RapidAPI-Key': '215869aad7msh103c18e9b7ab2f2p1ad0d0jsnee1afe6941cf'
                },
                data: req.body
              };
              const token:any = await axios.request(options)
              const submissionOptions:any = {
                    method: 'GET',
                    url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token.data.token,
                    params: {base64_encoded: 'true', fields: '*'},
                    headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': '215869aad7msh103c18e9b7ab2f2p1ad0d0jsnee1afe6941cf'
                    }
                };
            const submission = await axios.request(submissionOptions)
            return res.status(200).send({
                message: 'Register successfull.',
                success: true,
                data: submission.data
            });

        
        } catch (error) {
            return res.status(200).send({
                message: 'Register failed.',
                success: false,
                data: error
            });
        } 
            
    }
}


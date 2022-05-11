import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Question } from '../models/question.model';
import { createQuestion, getQuestions, getQuestion} from '../services/question.service';
import config from '../../config';
import axios from 'axios';
@Controller('question')
export class QuestionController{

    @Post('question')
    async compile(req: Request, res: Response) {
        try {
            const user = req.body.user;
            delete req.body.user;
            const question = await createQuestion(req.body, user);
            return res.send({
                data: question,
                success: true,
                message: "Question created successfully"
            });
        } catch (error) {
           console.log(error.data);
        } 
            
    }
    @Get('get-question/:id')
    async getQuestion(req: Request, res: Response) {
        try {
            const question =await getQuestion(req.params.id);
            return res.send({
                data: question,
                success: true,
                message: "Question fetched successfully"
            });
        } catch (error) {
           console.log(error.data);
        } 
            
    }
    @Get('get-questions')
    async getQuestions(req: Request, res: Response) {
        try {
            const questions =await getQuestions();
            return res.send({
                data: questions,
                success: true,
                message: "Questions fetched successfully"
            });
        } catch (error) {
           console.log(error.data);
        } 
            
    }

    @Get('test-case-results/:id')
    async getTestCaseResults(req: Request, res: Response) {
        try {
            const question = await Question.findById(req.params.id);
            const code = req.query;
            console.log(code)
            let inputs = question.inputs;
            let outputs = question.outputs;
            let testCases = [];
            for(let i=0;i<inputs.length;i++)
            {
                const options:any = {
                    method: 'POST',
                    url: 'https://judge0-ce.p.rapidapi.com/submissions',
                    params: {base64_encoded: 'true', fields: '*'},
                    headers: {
                      'content-type': 'application/json',
                      'Content-Type': 'application/json',
                      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                      'X-RapidAPI-Key': config.RAPID_API_KEY
                    },
                    data: {...code, ...{stdin: Buffer.from(inputs[i]).toString('base64')}},
                  };
                  const token:any = await axios.request(options)
                  const submissionOptions:any = {
                        method: 'GET',
                        url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token.data.token,
                        params: {base64_encoded: 'true', fields: '*'},
                        headers: {
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'X-RapidAPI-Key': config.RAPID_API_KEY
                        }
                    };
                const submission = await axios.request(submissionOptions)
                let output:any={};
                output.status = outputs[i].trim() === Buffer.from(submission.data.stdout, 'base64').toString().trim()
                output.time = submission.data.time;
                output.memory = submission.data.memory;
                if(submission.data.stderr)
                output.error = Buffer.from(submission.data.stderr, 'base64').toString();
                testCases.push(output);
            }
            return res.status(200).send({
                message: 'Register successfull.',
                success: true,
                data: testCases
            });


            
        } catch (error) {
            return res.send({
                data: error,
                success: true,
                message: "Question fetched successfully"
            });
           console.log(error.data);
        } 
    }

}


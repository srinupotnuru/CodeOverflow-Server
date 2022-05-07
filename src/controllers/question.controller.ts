import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { createQuestion, getQuestions} from '../services/question.service';
@Controller('question')
export class QuestionController{

    @Post('question')
    async compile(req: Request, res: Response) {
        try {
            const question = createQuestion(req.body);
            return res.send({
                data: question,
                success: true,
                message: "Question created successfully"
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
}


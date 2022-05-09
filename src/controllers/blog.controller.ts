import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Blog } from '../models/blog.model';
import { postBlog, getAllBlogs, getBlog, getMyBlogs } from '../services/blog.service';
import * as mongoose from 'mongoose';

@Controller('blog')
export class BlogController {

    @Post('create')
    async postBlog(req: Request, res: Response) {
        try {
            const data = await postBlog(req.body);
            return res.status(200).send({
                message: 'Blog created successfull.',
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

    @Get('get-all')
    async getAllBlogs(req:Request, res:Response){
        try{
            const blogs = await getAllBlogs();
            return res.status(200).send({
                message: 'Blogs retrived successfull.',
                success: true,
                data: blogs
            });

        }
        catch(err)
        {
            return res.status(200).send({
                message: err,
                success: false,});
        }
    }
    @Get('get-blog/:id')
    async getBlog(req:Request, res:Response){
        try{
            const blog = await getBlog(req.params.id);
            return res.status(200).send({
                message: 'Blog retrived successfull.',
                success: true,
                data: blog
            });

        }
        catch(err)
        {
            return res.status(200).send({
                message: err,
                success: false,});
        }
    }

    @Get('get-my-blogs/:id')
    async getMyBlogs(req:Request, res:Response){
        try{
            const blog = await getMyBlogs(req.params.id);
            return res.status(200).send({
                message: 'Blog retrived successfull.',
                success: true,
                data: blog
            });

        }
        catch(err)
        {
            return res.status(200).send({
                message: err,
                success: false,});
        }
    }

}
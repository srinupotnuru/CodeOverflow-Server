import { Blog, IBlog } from '../models/blog.model';
import * as mongoose from 'mongoose';
export const postBlog = async ( data:IBlog )=>{

    const blog = await Blog.create(data);
    return blog;

}

export const getAllBlogs = async ()=>
{
    return await Blog.find({}).populate('contributedBy');
}

export const getBlog = async (id:string)=>{
    return await Blog.findById(id).populate('contributedBy');
}

export const getMyBlogs = async (id:string)=>{
    return await Blog.find({contributedBy:new mongoose.Types.ObjectId(id)}).populate('contributedBy');
}
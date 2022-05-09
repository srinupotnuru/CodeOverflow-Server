import {Schema , Document , Model , model , Types} from 'mongoose';

export interface IBlog extends Document {
    name: string;
    blog: string;
    contributedBy: string;
    createdAt: Date;
}

const blogSchema = new Schema({
    name:{type:String,required:true},
    blog:{type:String,required:true},
    contributedBy: { type: Schema.Types.ObjectId, ref: 'User' }

},{ timestamps: true })

export const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);
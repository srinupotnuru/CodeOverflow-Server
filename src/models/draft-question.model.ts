import {Schema , Document , Model , model , Types} from 'mongoose';

export interface IDraftQuestion extends Document {
    name:string,
    question:string,
    tags:string[],
    inputs:string[],
    outputs:string[],
    difficulty:string,
}

const draftQuestionSchema = new Schema({
    name : {type:String , required:true},
    question : {type:String , required:true},
    tags : [{type:String , required:true}],
    inputs : [{type:String , required:true}],
    outputs : [{type:String , required:true}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    difficulty : {type:String , required:true},
})

export const DraftQuestion: Model<IDraftQuestion> = model<IDraftQuestion>('DraftQuestion', draftQuestionSchema);
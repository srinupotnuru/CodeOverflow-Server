import {Question, IQuestion} from '../models/question.model'
import { DraftQuestion } from '../models/draft-question.model';
export const createQuestion = async (question:IQuestion, user:any) => {

    if(user.userType === 'STUDENT'){
        const questionData = await DraftQuestion.create(question);
        return questionData;
    }
    const questionData = await Question.create(question);
    return questionData;
}

export const getQuestions = async ()=>{
    return await Question.find({});
}

export const getQuestion = async (id:string)=>{
    return await Question.findById(id);
}
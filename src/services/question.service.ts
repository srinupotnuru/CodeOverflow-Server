import {Question, IQuestion} from '../models/question.model'
export const createQuestion = async (question:IQuestion) => {

    const questionData = await Question.create(question);
    return questionData;
}

export const getQuestions = async ()=>{
    return await Question.find({});
}
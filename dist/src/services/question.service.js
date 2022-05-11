"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = exports.getQuestions = exports.createQuestion = void 0;
const question_model_1 = require("../models/question.model");
const draft_question_model_1 = require("../models/draft-question.model");
const createQuestion = (question, user) => __awaiter(void 0, void 0, void 0, function* () {
    const questionData = yield draft_question_model_1.DraftQuestion.create(question);
    return questionData;
    if (user.userType === 'STUDENT') {
        const questionData = yield draft_question_model_1.DraftQuestion.create(question);
        return questionData;
    }
    // const questionData = await Question.create(question);
    // return questionData;
});
exports.createQuestion = createQuestion;
const getQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield question_model_1.Question.find({});
});
exports.getQuestions = getQuestions;
const getQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield question_model_1.Question.findById(id);
});
exports.getQuestion = getQuestion;
//# sourceMappingURL=question.service.js.map
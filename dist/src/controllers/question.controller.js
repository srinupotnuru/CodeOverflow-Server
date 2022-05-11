"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.QuestionController = void 0;
const core_1 = require("@overnightjs/core");
const question_model_1 = require("../models/question.model");
const question_service_1 = require("../services/question.service");
const config_1 = require("../../config");
const axios_1 = require("axios");
let QuestionController = class QuestionController {
    compile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                console.log(user);
                delete req.body.user;
                console.log(req.body, "bodu");
                const question = (0, question_service_1.createQuestion)(req.body, user);
                console.log(question);
                return res.send({
                    data: question,
                    success: true,
                    message: "Question created successfully"
                });
            }
            catch (error) {
                console.log(error.data);
            }
        });
    }
    getQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield (0, question_service_1.getQuestion)(req.params.id);
                return res.send({
                    data: question,
                    success: true,
                    message: "Question fetched successfully"
                });
            }
            catch (error) {
                console.log(error.data);
            }
        });
    }
    getQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield (0, question_service_1.getQuestions)();
                return res.send({
                    data: questions,
                    success: true,
                    message: "Questions fetched successfully"
                });
            }
            catch (error) {
                console.log(error.data);
            }
        });
    }
    getTestCaseResults(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield question_model_1.Question.findById(req.params.id);
                const code = req.query;
                console.log(code);
                let inputs = question.inputs;
                let outputs = question.outputs;
                let testCases = [];
                for (let i = 0; i < inputs.length; i++) {
                    const options = {
                        method: 'POST',
                        url: 'https://judge0-ce.p.rapidapi.com/submissions',
                        params: { base64_encoded: 'true', fields: '*' },
                        headers: {
                            'content-type': 'application/json',
                            'Content-Type': 'application/json',
                            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                            'X-RapidAPI-Key': config_1.default.RAPID_API_KEY
                        },
                        data: Object.assign(Object.assign({}, code), { stdin: Buffer.from(inputs[i]).toString('base64') }),
                    };
                    const token = yield axios_1.default.request(options);
                    const submissionOptions = {
                        method: 'GET',
                        url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token.data.token,
                        params: { base64_encoded: 'true', fields: '*' },
                        headers: {
                            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                            'X-RapidAPI-Key': config_1.default.RAPID_API_KEY
                        }
                    };
                    const submission = yield axios_1.default.request(submissionOptions);
                    let output = {};
                    output.status = outputs[i].trim() === Buffer.from(submission.data.stdout, 'base64').toString().trim();
                    output.time = submission.data.time;
                    output.memory = submission.data.memory;
                    if (submission.data.stderr)
                        output.error = Buffer.from(submission.data.stderr, 'base64').toString();
                    testCases.push(output);
                }
                return res.status(200).send({
                    message: 'Register successfull.',
                    success: true,
                    data: testCases
                });
            }
            catch (error) {
                return res.send({
                    data: error,
                    success: true,
                    message: "Question fetched successfully"
                });
                console.log(error.data);
            }
        });
    }
};
__decorate([
    (0, core_1.Post)('question'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "compile", null);
__decorate([
    (0, core_1.Get)('get-question/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestion", null);
__decorate([
    (0, core_1.Get)('get-questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestions", null);
__decorate([
    (0, core_1.Get)('test-case-results/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getTestCaseResults", null);
QuestionController = __decorate([
    (0, core_1.Controller)('question')
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map
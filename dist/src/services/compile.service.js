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
exports.compile = void 0;
const axios_1 = require("axios");
const config_1 = require("../../config");
const compile = (program) => __awaiter(void 0, void 0, void 0, function* () {
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
        data: program
    };
    axios_1.default.request(options).then(function (response) {
        const token = response.data.token;
        const submissionOptions = {
            method: 'GET',
            url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': config_1.default.RAPID_API_KEY
            }
        };
        axios_1.default.request(submissionOptions).then(function (resp) {
            return resp;
        }).catch(function (error) {
            console.error(error);
        });
    }).catch(function (error) {
        console.error(error);
    });
});
exports.compile = compile;
//# sourceMappingURL=compile.service.js.map
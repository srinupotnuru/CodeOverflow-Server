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
exports.CompilerController = void 0;
const core_1 = require("@overnightjs/core");
const axios_1 = require("axios");
let CompilerController = class CompilerController {
    compile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    method: 'POST',
                    url: 'https://judge0-ce.p.rapidapi.com/submissions',
                    params: { base64_encoded: 'true', fields: '*' },
                    headers: {
                        'content-type': 'application/json',
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'X-RapidAPI-Key': '215869aad7msh103c18e9b7ab2f2p1ad0d0jsnee1afe6941cf'
                    },
                    data: req.body
                };
                const token = yield axios_1.default.request(options);
                const submissionOptions = {
                    method: 'GET',
                    url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token.data.token,
                    params: { base64_encoded: 'true', fields: '*' },
                    headers: {
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'X-RapidAPI-Key': '215869aad7msh103c18e9b7ab2f2p1ad0d0jsnee1afe6941cf'
                    }
                };
                const submission = yield axios_1.default.request(submissionOptions);
                return res.status(200).send({
                    message: 'Register successfull.',
                    success: true,
                    data: submission.data
                });
            }
            catch (error) {
                return res.status(200).send({
                    message: 'Register failed.',
                    success: false,
                    data: error
                });
            }
        });
    }
};
__decorate([
    (0, core_1.Post)('compile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompilerController.prototype, "compile", null);
CompilerController = __decorate([
    (0, core_1.Controller)('compile')
], CompilerController);
exports.CompilerController = CompilerController;
//# sourceMappingURL=compiler.controller.js.map
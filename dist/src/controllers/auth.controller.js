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
exports.AuthenticationController = void 0;
const core_1 = require("@overnightjs/core");
const auth_service_1 = require("../services/auth.service");
let AuthenticationController = class AuthenticationController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, auth_service_1.register)(req.body);
                return res.status(200).send({
                    message: 'Register successfull.',
                    success: true,
                    data: data
                });
            }
            catch (e) {
                return res.status(200).send({
                    message: e,
                    success: false,
                });
            }
        });
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRegistrationStatus = yield (0, auth_service_1.registerUser)(req.body);
                return res.status(200).send({
                    message: 'Verification Process is Done',
                    success: true,
                    data: userRegistrationStatus
                });
            }
            catch (e) {
                return res.status(200).send({
                    message: e,
                    success: false,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, auth_service_1.login)(req.body);
                return res.status(200).send({
                    message: 'Login successfull.',
                    success: true,
                    data: data
                });
            }
            catch (e) {
                return res.status(200).send({
                    message: e,
                    success: false,
                });
            }
        });
    }
};
__decorate([
    (0, core_1.Post)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, core_1.Post)('verify-otp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "registerUser", null);
__decorate([
    (0, core_1.Post)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
AuthenticationController = __decorate([
    (0, core_1.Controller)('auth')
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map
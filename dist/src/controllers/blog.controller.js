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
exports.BlogController = void 0;
const core_1 = require("@overnightjs/core");
const blog_service_1 = require("../services/blog.service");
let BlogController = class BlogController {
    postBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, blog_service_1.postBlog)(req.body);
                return res.status(200).send({
                    message: 'Blog created successfull.',
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
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield (0, blog_service_1.getAllBlogs)();
                return res.status(200).send({
                    message: 'Blogs retrived successfull.',
                    success: true,
                    data: blogs
                });
            }
            catch (err) {
                return res.status(200).send({
                    message: err,
                    success: false,
                });
            }
        });
    }
    getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield (0, blog_service_1.getBlog)(req.params.id);
                return res.status(200).send({
                    message: 'Blog retrived successfull.',
                    success: true,
                    data: blog
                });
            }
            catch (err) {
                return res.status(200).send({
                    message: err,
                    success: false,
                });
            }
        });
    }
    getMyBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield (0, blog_service_1.getMyBlogs)(req.params.id);
                return res.status(200).send({
                    message: 'Blog retrived successfull.',
                    success: true,
                    data: blog
                });
            }
            catch (err) {
                return res.status(200).send({
                    message: err,
                    success: false,
                });
            }
        });
    }
};
__decorate([
    (0, core_1.Post)('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "postBlog", null);
__decorate([
    (0, core_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlogs", null);
__decorate([
    (0, core_1.Get)('get-blog/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlog", null);
__decorate([
    (0, core_1.Get)('get-my-blogs/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getMyBlogs", null);
BlogController = __decorate([
    (0, core_1.Controller)('blog')
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map
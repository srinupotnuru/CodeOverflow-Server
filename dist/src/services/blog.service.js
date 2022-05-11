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
exports.getMyBlogs = exports.getBlog = exports.getAllBlogs = exports.postBlog = void 0;
const blog_model_1 = require("../models/blog.model");
const postBlog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.create(data);
    return blog;
});
exports.postBlog = postBlog;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.find({}).populate('contributedBy');
});
exports.getAllBlogs = getAllBlogs;
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.findById(id).populate('contributedBy');
});
exports.getBlog = getBlog;
const getMyBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.find({ contributedBy: id }).populate('contributedBy');
});
exports.getMyBlogs = getMyBlogs;
//# sourceMappingURL=blog.service.js.map
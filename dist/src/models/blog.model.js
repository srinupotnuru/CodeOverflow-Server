"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    blog: { type: String, required: true },
    contributedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
//# sourceMappingURL=blog.model.js.map
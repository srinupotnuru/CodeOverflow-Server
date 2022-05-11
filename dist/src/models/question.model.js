"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    question: { type: String, required: true },
    tags: [{ type: String, required: true }],
    inputs: [{ type: String, required: true }],
    outputs: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    difficulty: { type: String, required: true },
});
exports.Question = (0, mongoose_1.model)('Question', questionSchema);
//# sourceMappingURL=question.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftUser = void 0;
const mongoose_1 = require("mongoose");
const draftUserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    regdNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true }
});
exports.DraftUser = (0, mongoose_1.model)('DraftUser', draftUserSchema);
//# sourceMappingURL=draftUser.model.js.map
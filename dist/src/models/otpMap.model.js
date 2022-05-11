"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpMap = void 0;
const mongoose_1 = require("mongoose");
const otpMapSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
});
exports.OtpMap = (0, mongoose_1.model)('OtpMap', otpMapSchema);
//# sourceMappingURL=otpMap.model.js.map
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
exports.registerUser = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const otpMap_model_1 = require("../models/otpMap.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const config_1 = require("../../config");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by email or regdNumber and check if user is already registered
    const userExists = yield user_model_1.User.findOne({ $or: [{ email: data.email }, { regdNumber: data.regdNumber }] });
    if (userExists) {
        throw "User already exists";
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'iamsrinu3@gmail.com',
            pass: config_1.default.EMAIL_APP_KEY
        }
    });
    var mailOptions = {
        from: 'iamsrinu3@gmail.com',
        to: data.email,
        subject: 'CodeOverFlow',
        text: `Your Email One Time Password(OTP) to log into your CodeOverFlow account is ${otp}`
    };
    yield transporter.sendMail(mailOptions, function (error, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(error);
            }
            else {
                console.log('OTP sent to : ' + data.email);
                let resData = yield otpMap_model_1.OtpMap.findOneAndUpdate({ email: data.email }, { $set: { otp: otp, email: data.email } }, { upsert: true, new: true });
                return resData;
            }
        });
    });
    // const saltRounds = 10;
    // const userPlainPassword = data.password;
    // const hash=await bcrypt.hash(userPlainPassword, saltRounds);
    // data.password=hash;
    // const user = await User.create(data);
    // return user;
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ regdNumber: data.regdNumber });
    if (!user) {
        throw `User not found with regdNumber ${data.regdNumber}`;
    }
    const isPasswordValid = yield bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw "Invalid password";
    }
    return user;
});
exports.login = login;
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = data;
    delete data.otp;
    // check if the user previously exists
    let user = yield user_model_1.User.findOne({ email: email });
    // if user exists;
    if (user)
        throw `A user exists with the given  ${data.email}`;
    //else
    else {
        // check if user enters the correct otp;
        const saltRounds = 10;
        let record_found = yield otpMap_model_1.OtpMap.findOne({ email: email, otp: otp });
        if (record_found) {
            // entry found 
            bcrypt.hash(password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                // Now we can store the password hash in db.
                yield user_model_1.User.create(Object.assign(Object.assign({}, data), { password: hash }));
            }));
            return "User Entry is Successfully Created";
        }
        else {
            throw `User entered wrong OTP`;
        }
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=auth.service.js.map
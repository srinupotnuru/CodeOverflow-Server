import {IUser, User} from '../models/user.model';
import { OtpMap } from '../models/otpMap.model';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as otpGenerator from 'otp-generator';

export const register = async (data) =>
{
    // find user by email or regdNumber and check if user is already registered
    const userExists = await User.findOne({$or: [{email: data.email}, {regdNumber: data.regdNumber}]});
    if(userExists)
    {
        throw "User already exists";
    }

    const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false , digits: true });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'iamsrinu3@gmail.com',
            pass: 'nilkamxnadikrlbu'
        }
    });

    var mailOptions = {
        from: 'iamsrinu3@gmail.com',
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: `${otp}`
    };

    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('OTP sent to : ' + data.email);
            const otpMap ={email :data.email , otp : otp};
            return await OtpMap.create(otpMap);
        }
    });


    
    const saltRounds = 10;
    const userPlainPassword = data.password;
    const hash=await bcrypt.hash(userPlainPassword, saltRounds);
    data.password=hash;
    const user = await User.create(data);
    return user;
    
}

export const login = async (data) =>{
    const user = await User.findOne({regdNumber: data.regdNumber});
    if(!user)
    {
        throw "User not found";
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid)
    {
        throw "Invalid password";
    }
    return user;
}
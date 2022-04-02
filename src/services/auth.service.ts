import {IUser, User} from '../models/user.model';
import { OtpMap } from '../models/otpMap.model';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as otpGenerator from 'otp-generator';
import { DraftUser } from '../models/draftUser.model';

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

    await transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('OTP sent to : ' + data.email);
            let resData = await OtpMap.findOneAndUpdate(
                 { email: data.email },
                {$set: { otp: otp  , email:data.email}},
                { upsert: true, new: true }
            );
            return  resData
        }
    });


    
    // const saltRounds = 10;
    // const userPlainPassword = data.password;
    // const hash=await bcrypt.hash(userPlainPassword, saltRounds);
    // data.password=hash;
    // const user = await User.create(data);
    // return user;
    
}

export const login = async (data) =>{
    const user = await User.findOne({regdNumber: data.regdNumber});
    if(!user)
    {
        throw `User not found with regdNumber ${data.regdNumber}`;
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid)
    {
        throw "Invalid password";
    }
    return user;
}


export const registerUser = async(data) => {
    const {email, otp, password}= data;
    delete data.otp;

    // check if the user previously exists

    let user = await User.findOne({ email: email });

    // if user exists;
    if(user)  throw `A user exists with the given  ${data.email}`;

    //else
    else{

        // check if user enters the correct otp;

        const saltRounds = 10;

        let record_found = await OtpMap.findOne({email:email, otp:otp});

        if(record_found){
            // entry found 
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                // Now we can store the password hash in db.
                await User.create({...data, password:hash});

              });
            return "User Entry is Successfully Created";
        }
        else{
            throw `User entered wrong OTP`;
        }

    }


}
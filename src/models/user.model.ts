import {Schema , Document , Model , model , Types} from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    regdNumber: string;
    password: string;
    email: string;
    phoneNumber: string;
    userType: string;
}

const userSchema = new Schema({
    firstName : {type:String , required:true},
    lastName : {type:String , required:true},
    regdNumber : {type:String , required:true , unique:true},
    password :{type:String , required:true},
    email : {type:String , required:true , unique:true},
    phoneNumber : {type:String , required:true},
    userType : {type:String , required:true},
})

export const User: Model<IUser> = model<IUser>('User', userSchema);
import {Schema , Document , Model , model , Types} from 'mongoose';

export interface IDraftUser extends Document {
    firstName: string;
    lastName: string;
    regdNumber: string;
    password: string;
    email: string;
    phoneNumber: string;
    otp:string;
}

const draftUserSchema = new Schema({
    firstName : {type:String , required:true},
    lastName : {type:String , required:true},
    regdNumber : {type:String , required:true , unique:true},
    password :{type:String , required:true},
    email : {type:String , required:true , unique:true},
    phoneNumber : {type:String , required:true},
    otp : {type:String , required:true}
})

export const DraftUser: Model<IDraftUser> = model<IDraftUser>('DraftUser', draftUserSchema);
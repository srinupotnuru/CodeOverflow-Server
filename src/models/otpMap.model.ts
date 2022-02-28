import {Schema , Document , Model , model , Types} from 'mongoose';

export interface IOtpMap extends Document {
    email: string;
    otp:string;
}

const otpMapSchema = new Schema({
    email : {type:String , required:true , unique:true},
    otp :{type:String , required:true},
})

export const OtpMap: Model<IOtpMap> = model<IOtpMap>('OtpMap', otpMapSchema);
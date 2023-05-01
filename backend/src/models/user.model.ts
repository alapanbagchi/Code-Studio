import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
    pfp: {
        type: String,
    },
   fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    sys_permissions: {
        type: [String],
        required: true,
        default: []
    },
    email_verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export interface IUser extends Document {
    pfp: string,
    fullName: string,
    email: string,
    username: string,
    password: string,
    email_verified: boolean,
    sys_permissions: string[],
}

export default model<IUser>('User', UserSchema)
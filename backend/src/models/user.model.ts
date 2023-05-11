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
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

export interface IUser extends Document {
    pfp: string,
    fullName: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
}

export default model<IUser>('User', UserSchema)
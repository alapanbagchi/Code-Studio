import { Schema, model, Document } from 'mongoose';

const SubmissionSchema = new Schema({
    problem_id: {
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    passed: {
        type: Boolean,
        default: false
    },
    errorName: {
        type: String || null,
        default: null
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },

}, { timestamps: true })

export interface ISubmission extends Document {
    problem_id: string,
    user_id: string,
    passed: boolean,
    errorName: string | null,
    language: string,
    code: string,
}

export default model<ISubmission>('Submissions', SubmissionSchema)
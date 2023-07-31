import { Schema, model, Document } from 'mongoose';

const TestSubmissionSchema = new Schema({
    test_id: {
        type: String,
        required: true
    },
    problem_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
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
    correct: {
        type: Boolean,
    },
    remarks: {
        type: String,
    },
    marks: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export interface ITestSubmission extends Document {
    test_id: string,
    problem_id: string,
    user_id: string,
    passed: boolean,
    errorName: string | null,
    language: string,
    code: string,
    correct: boolean,
    remarks: string,
    marks: number
}

export default model<ITestSubmission>('TestSubmission', TestSubmissionSchema)
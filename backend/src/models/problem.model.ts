import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    output_type: {
        type: String,
        required: true
    },
    testCases: [{
        type: [{
            input: [{
                type: String,
                variableName: String,
                value: String
            }],
            output: {
                type: String,
                value: String
            },
            explanation: String
        }],
        required: true
    }],
    difficulty: {
        type: String,
        required: true,
        enum: ["EASY", "MEDIUM", "HARD"]
    },
    tags: [{
        type: String,
        required: true,
    }],
}, { timestamps: true })

export interface IProblem extends Document {
    title: string,
    description: string,
    output_type: string,
    testCases: {
        input: {
            type: string,
            variableName: string,
            value: string
        }[],
        output: {
            type: string,
            value: string
        },
        explanation: string
    }[],
    difficulty: "EASY" | "MEDIUM" | "HARD",
    tags: string[],
}

export default model<IProblem>('User', UserSchema)
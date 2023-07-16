import { Schema, model, Document } from 'mongoose';

export const ProblemSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    output_type: {
        type: String,
        required: true,
    },
    test_cases: [{
        input: [{
            type: {
                type: String,
            },
            name: {
                type: String,
            },
            value: {
                type: String,
            }
        }],
        output: {
            type: String,
            required: true,
        },
        explanation: {
            type: String
        }
    }],
    difficulty: String,
    tags: [String],
    input_variables: [{
        type: {
            type: String,
        },
        name: {
            type: String,
        }
    }],
    totalSubmissions: {
        type: Number,
        default: 0
    },
    totalPassed: {
        type: Number,
        default: 0
    }
})

export interface IProblem extends Document {
    title: string,
    description: string,
    output_type: string,
    test_cases: [{
        input: [{
            type: string,
            name: string,
            value: string
        }],
        output: {
            value: string
        },
        explanation: string
    }],
    difficulty: string,
    tags: [string],
    input_variables: [{
        type: string,
        name: string
    }],
    totalSubmissions: number,
    totalPassed: number
}

export default model<IProblem>('Problem', ProblemSchema)
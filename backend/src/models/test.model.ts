import { Schema, model, Document } from 'mongoose';
import { ProblemSchema } from './problem.model';
const TestSchema = new Schema({
    problems: [{
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
        marks: {
            type: Number,
            required: true,
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
        input_variables: [{
            type: {
                type: String,
            },
            name: {
                type: String,
            }
        }]
    }],
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },

    examiner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        problem_id: [{
            type: String,
        }],
    }]
}, {
    timestamps: true
})

export interface ITest extends Document {
    problems: {
        title: string,
        description: string,
        output_type: string,
        test_cases: [{
            input: [{
                type: string,
                name: string,
                value: string
            }],
            output: string,
            explanation: string
        }],
        input_variables: [{
            type: string,
            name: string
        }]
    },
    name: string,
    startDate: Date,
    endDate: Date,
    examiner: Schema.Types.ObjectId,
    users: {
        id: Schema.Types.ObjectId,
        problem_id: string[],
    }[],
}

export default model<ITest>('Test', TestSchema)
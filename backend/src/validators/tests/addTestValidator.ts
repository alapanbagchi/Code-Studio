import * as yup from 'yup'
import { IUser } from '../../models/user.model'

export const userRegisterValidator = async (data: IUser) => {
    try {
        const schema = yup.object().shape({

            title: yup.string().required('Title is required'),
            description: yup.string().required('Description is required'),
            startDate: yup
                .date()
                .required('Start Date is required')
                // Check if the start date is in the future or not
                .test('startDate', 'Start Date should be in the future', (value) => {
                    const startDate = new Date(value);
                    const currentDate = new Date();
                    return startDate > currentDate;
                })
                .test('startDate', 'Start Date should be before End Date', (value) => {
                    const startDate = new Date(value);
                    const endDate: Date = new Date(data.endDate);
                    return startDate < endDate;
                }),
            endDate: yup
                .date()
                .required('End Date is required')
                // Check if the end date is in the future or not
                .test('endDate', 'End Date should be in the future', (value) => {
                    const endDate = new Date(value);
                    const currentDate = new Date();
                    return endDate > currentDate;
                })
                .test('endDate', 'End Date should be after Start Date', (value) => {
                    const endDate = new Date(value);
                    const startDate = new Date(data.startDate);
                    return endDate > startDate;
                }),
            problems: yup.array().of(
                yup.object().shape({
                    title: yup.string().required('Title is required'),
                    input_variables: yup.array().of(
                        yup.object().shape({
                            name: yup.string().required('Name is required'),
                            type: yup.string().required('Type is required')
                        })
                    ),
                    marks: yup.number().required('Marks is required'),
                    description: yup.string().required('Description is required'),
                    output_type: yup.string().required('Output Type is required'),
                    test_cases: yup.array().of(
                        yup.object().shape({
                            input: yup.array().of(
                                yup.object().shape({
                                    name: yup.string().required('Name is required'),
                                    value: yup.string().required('Value is required')
                                })
                            ),
                            output: yup.string().required('Output is required'),
                            explanation: yup.string().required('Explanation is required')
                        })
                    )
                })
            )
        })
        const res = await schema.validate(data, { abortEarly: false })
        return { valid: true }
    } catch (err) {
        return { valid: false, data: err.errors }
    }
}

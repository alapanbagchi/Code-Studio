import * as yup from 'yup'
import { IUser } from '../../models/user.model'

export const userRegisterValidator = async (data: IUser) => {
    try {
        const schema = yup.object().shape({
            fullName: yup.string().required(),
            email: yup.string().email().required(),
            username: yup.string().required(),
            password: yup
                .string()
                .required('Password is required')
                .min(10, 'Password must be at least 10 characters')
                .max(50, 'Password must be at most 50 characters')
                .matches(/(?=.*[A-Z])/, 'Password must contain one uppercase letter')
                .matches(/(?=.*[a-z])/, 'Password must contain one lowercase letter')
                .matches(/(?=.*[0-9])/, 'Password must contain one number')
                .matches(/(?=.*[!@#$%_^&*])/, 'Password must contain one special character'),
            confirmPassword: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        })
        await schema.validate(data, { abortEarly: false })
        return { valid: true }
    } catch (err) {
        return { valid: false, data: err.errors }
    }
}
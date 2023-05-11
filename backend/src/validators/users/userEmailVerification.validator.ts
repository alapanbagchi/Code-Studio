import * as yup from 'yup'
import { IUser } from '../../models/user.model'

export const userEmailVerificationValidator = async (data: IUser) => {
    try {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            otp: yup.string().required().min(6).max(6)
        })
        await schema.validate(data, { abortEarly: false })
        return { valid: true }
    } catch (err) {
        return { valid: false, data: err.errors }
    }
}
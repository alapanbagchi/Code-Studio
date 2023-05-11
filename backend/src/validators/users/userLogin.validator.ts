import * as yup from 'yup'
import { IUser } from '../../models/user.model'

export const userLoginValidator = async (data: IUser) => {
    try {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        await schema.validate(data, { abortEarly: false })
        return { valid: true }
    } catch (err) {
        return { valid: false, data: err.errors }
    }
}
import { Request, Response } from "express"
import { redisClient } from "../.."
import userModel from "../../models/user.model"

export const userEmailVerificationSendController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        // > Find the user with the same email and return an error if found
        const user = await userModel.findOne({ email: email })
        if (user) return res.status(400).json({ type: "ERROR", message: "User with this email already exists" })
        // > Check if the email is already in redis and return an error if found with the time
        const redisData = await redisClient.v4.get(`email_verification_code:${email}`)
        if (redisData) return res.status(200).json({ type: "SUCCESS", message: "Email already sent", time: JSON.parse(redisData).time })
        // > Create an 6 digit alphanumeric code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase()
        console.log(code)
        // > Store the new code in redis with the email as the key that expires after 10 mins
        const dateNow = new Date()
        await redisClient.v4.set(`email_verification_code:${email}`, JSON.stringify({ code: code, time: dateNow }), 'EX', 10 * 60)
        // > Expire the code after 10 mins
        await redisClient.v4.expire(`email_verification_code:${email}`, 10 * 60)
        return res.status(200).json({ type: "SUCCESS", message: "Email sent successfully", time: dateNow })
    } catch (error) {
        return res.status(500).json({ type: "ERROR", message: error.message })
    }
}
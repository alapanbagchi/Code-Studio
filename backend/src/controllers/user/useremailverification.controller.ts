import { Request, Response } from "express"
import { redisClient } from "../.."
export const userEmailVerificationController = async (req: Request, res: Response) => {
    try {
        const {email, otp} = req.body
        // > Get the user from redis and if not found return an error
        const redisData = await redisClient.v4.get(`email_verification_code:${email}`)
        if (!redisData) return res.status(400).json({ type: "ERROR", message: "The OTP is either invalid or it has expired" })
        // > Check if the code is correct and if not return an error
        if (JSON.parse(redisData).code !== otp) return res.status(400).json({ type: "ERROR", message: "The OTP is not correct. Please recheck your OTP and try again" })
        // > Delete the redis data
        await redisClient.v4.del(`email_verification_code:${email}`)
        return res.status(200).json({ type: "SUCCESS", message: "OTP has been verified successfully" })
    } catch (error) {
        return res.status(500).json({ type: "ERROR", message: error.message })
    }
}
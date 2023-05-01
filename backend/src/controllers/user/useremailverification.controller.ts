import { Request, Response } from "express"
import { redisClient } from "../.."
import userModel from "../../models/user.model"

export const userEmailVerificationVerifyController = async (req: Request, res: Response) => {
    try {
        const {email, code} = req.body
        
        return res.status(200).json({ type: "SUCCESS", message: "Email sent successfully" })
    } catch (error) {
        return res.status(500).json({ type: "ERROR", message: error.message })
    }
}
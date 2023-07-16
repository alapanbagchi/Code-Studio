import { Request, Response } from "express"
import userModel from "../../models/user.model"
import bcrypt from 'bcryptjs'
import axios from "axios"
export const userLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // > Check if user is already logged in
        // if (req.isAuthenticated()) return res.status(200).json({ type: "SUCCESS", message: "You are already logged in to Joridiro" })

        // > Check if user exists
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ type: "ERROR", message: "The user with that email does not exist in our database" })

        // > Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({ type: "ERROR", message: "Your credentials are incorrect. Please try again" })

        // > New object with only the required data
        const userObject = {
            _id: user._id
        }
        req.login(userObject, async (err) => {
            if (err) return res.status(500).json({ type: "ERROR", message: err.message })
            return res.status(200).json({ type: 'SUCCESS', message: "You have been successfully logged in", cookies: req.session?.cookie })
        })
    } catch (error) {
        return res.status(500).json({ type: "ERROR", message: error.message })
    }
}
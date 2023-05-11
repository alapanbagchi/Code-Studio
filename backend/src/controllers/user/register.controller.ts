import userModel from "../../models/user.model"
import { Request, Response } from "express"
import bcrypt from 'bcryptjs'

export const userRegistrationController = async (req: Request, res: Response) => {
    try {
        const { fullName, username, email, password } = req.body
        console.log(req.body)
        // > Find the user with the same email or username and return an error if found
        const user = await userModel.findOne({ $or: [{ email: email }, { username: username }] })
        console.log(user)
        if (user) return res.status(400).json({ type: "ERROR", message: "User already exists" })
        // > Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // > Create the new user
        const newUser = new userModel({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: false,
            email_verified: false,
            pfp: ""
        })
        // > Save the new user
        await newUser.save()
        return res.status(200).json({ type: "SUCCESS", message: "User registered successfully" })
    } catch (error) {
        return res.status(500).json({ type: "ERROR", message: error.message })
    }
}
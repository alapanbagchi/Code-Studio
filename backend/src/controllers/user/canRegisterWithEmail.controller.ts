import userModel from "../../models/user.model"
import { Request, Response } from "express"
export const userEmailExists = async (req: Request, res: Response) => {
    try{
        const { email } = req.body
        const user = await userModel.findOne({ email: email })
        if(user) return res.status(200).json({type: "ERROR", message: "This email is already registered"})
        return res.status(200).json({type: "SUCCESS", message: "This email is not registered"})
    } catch(err){
        return res.status(500).json({type: "ERROR", message: err.message})
    }
}
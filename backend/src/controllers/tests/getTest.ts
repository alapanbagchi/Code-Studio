import { Request, Response } from "express"
import testModel from "../../models/test.model"
import userModel from "../../models/user.model"


export const getTest = async (req: Request, res: Response) => {
    try{
        const test = await testModel.findById(req.params.id)
        if(!test) return res.status(404).json({type: "ERROR", message: "Test not found"})
        const examiner = await userModel.findById(test?.examiner)
        if(!examiner) return res.status(404).json({type: "ERROR", message: "Examiner not found"})
        const testResult = {
            ...test.toObject(),
            examiner: examiner.fullName
        } 

        return res.status(200).json({type: "SUCCESS", message: "Problem added successfully", data: testResult})
    } catch(err){
        return res.status(500).json({type: "ERROR", message: err.message})
    }
}
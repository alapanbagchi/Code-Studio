import { Request, Response } from "express"
import problemModel from "../../models/problem.model"


export const getAllProblems = async (req: Request, res: Response) => {
    try{
        const problems = await problemModel.find({})
        return res.status(200).json({type: "SUCCESS", message: "Problem added successfully", data: problems})
    } catch(err){
        return res.status(500).json({type: "ERROR", message: err.message})
    }
}
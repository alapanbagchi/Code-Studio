import { Request, Response } from "express"
import problemModel from "../../models/problem.model"


export const getProblem = async (req: Request, res: Response) => {
    try{
        const problem = await problemModel.findById(req.params.id)
        return res.status(200).json({type: "SUCCESS", message: "Problem added successfully", data: problem})
    } catch(err){
        return res.status(500).json({type: "ERROR", message: err.message})
    }
}
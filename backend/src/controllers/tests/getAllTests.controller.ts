import { Request, Response } from "express"
import testModel from "../../models/test.model"


export const getAllTests = async (req: Request, res: Response) => {
    try {
        const tests = await testModel.find()
        return res.status(200).json({ type: "SUCCESS", message: "Problem added successfully", data: tests })
    } catch (err) {
        return res.status(500).json({ type: "ERROR", message: err.message })
    }
}
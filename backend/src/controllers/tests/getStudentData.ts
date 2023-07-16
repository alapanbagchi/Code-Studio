import { Request, Response } from "express"
import testModel from "../../models/test.model"
import userModel from "../../models/user.model"
import testSubmissionModel from "../../models/testSubmissionModel"


export const getStudentTestSubsmission = async (req: Request, res: Response) => {
    try {
        const submissions = await testSubmissionModel.find({ user_id: req.params.id, test_id: req.params.testid })

        return res.status(200).json({ type: "SUCCESS", message: "Problem added successfully", data: submissions})
    } catch (err) {
        return res.status(500).json({ type: "ERROR", message: err.message })
    }
}
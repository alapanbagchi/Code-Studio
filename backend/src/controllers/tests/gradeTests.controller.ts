import { Request, Response } from "express"
import testSubmissionModel, { ITestSubmission } from "../../models/testSubmissionModel"


export const gradeTests = async (req: Request, res: Response) => {
    try {
        if (!req.user.isAdmin) return res.status(401).json({ type: "ERROR", message: "Unauthorized" })
        const test = await testSubmissionModel.findOne({
            test_id: req.body.test_id,
            user_id: req.body.user_id,
            problem_id: req.body.problem_id
        })
        console.log(req.body)
        if (!test) return res.status(404).json({ type: "ERROR", message: "Test not found" })
        test.correct = req.body.correct
        test.remarks = req.body.remarks
        await test.save()
        return res.status(200).json({ type: "SUCCESS", message: "Test graded" })
    } catch (err) {
        return res.status(500).json({ type: "ERROR", message: err.message })
    }
}
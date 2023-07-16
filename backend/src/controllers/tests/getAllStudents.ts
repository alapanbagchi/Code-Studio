import { Request, Response } from "express"
import testModel from "../../models/test.model"
import userModel from "../../models/user.model"
import testSubmissionModel from "../../models/testSubmissionModel"


export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const test = await testModel.findById(req.params.testid)
        const students = test.users
        // Find the names of all the students enrolled in the test
        const studentNames = await Promise.all(students.map(async (student: any) => {
            let passed = 0
            let failed = 0
            const user = await userModel.findById(student.id)
            const submissions = await testSubmissionModel.find({ user_id: student.id, test_id: req.params.testid })
            submissions.forEach((submission: any) => {
                if (submission.passed) {
                    passed++
                } else {
                    failed++
                }
            })
            return {
                name: user.fullName,
                email: user.email,
                username: user.username,
                id: user._id,
                passed: passed,
                failed: failed
            }
        }))

        return res.status(200).json({ type: "SUCCESS", message: "Problem added successfully", data: studentNames })
    } catch (err) {
        return res.status(500).json({ type: "ERROR", message: err.message })
    }
}
import { Request, Response, Router } from "express";
import { pythonExecutor } from "../../utils/executors/python.executor";
import userModel from "../../models/user.model";
import problemModel from "../../models/problem.model";
import testSubmissionModel from "../../models/testSubmissionModel";
import testModel from "../../models/test.model";

export const testSubmissions = async (req: Request, res: Response) => {
    try {
        const result: any = await pythonExecutor(req.body.id, req.body.code, req.body.testCases, req.body.language, req.body.returnType);
        const user = await userModel.findById(req.user._id);
        const passed = result.every((item: any) => item.passed);
        const test = await testModel.findById(req.body.test_id);
        // If the user is not enrolled in the test, push or else update the count
        if(test.users.findIndex((item: any) => item.id.toString() === req.user._id.toString()) === -1) {
            test.users.push({
                id: req.user._id,
                problem_id: [req.body.problem_id]
            });
        } else {
            // Check if the user has already submitted the problem and if not then push the problem_id
            if(test.users[test.users.findIndex((item: any) => item.id.toString() === req.user._id.toString())].problem_id.findIndex((item: any) => item.toString() === req.body.problem_id.toString()) === -1) {
                test.users[test.users.findIndex((item: any) => item.id.toString() === req.user._id.toString())].problem_id.push(req.body.problem_id);
            }
        }
        await test.save();
        const submission = await testSubmissionModel.findOne({
            test_id: req.body.test_id,
            problem_id: req.body.problem_id,
            user_id: req.user._id
        });
        if(submission) {
            submission.passed = passed;
            submission.errorName = passed && result.find((item: any)=> item.exception) ? result.find((item: any)=> item.exception).exception.type : null;
            submission.code = req.body.code;
            await submission.save();
        } else {
            await testSubmissionModel.create({
                test_id: req.body.test_id,
                problem_id: req.body.problem_id,
                user_id: req.user._id,
                passed: passed,
                errorName: passed && result.find((item: any)=> item.exception) ? result.find((item: any)=> item.exception).exception.type : null,
                language: 'python',
                code: req.body.code,
                marks: req.body.marks
            });
        }
        return res.status(200).send({ message: "Success", data: result });
    } catch (err) {
        res.status(500).send({ type: "ERROR", message: err.message });
    }
}
import { Request, Response, Router } from "express";
import { pythonExecutor } from "../../utils/executors/python.executor";
import userModel from "../../models/user.model";
import submissionsModel from "../../models/submissions.model";
import problemModel from "../../models/problem.model";

export const submissions = async (req: Request, res: Response) => {
    try {
        const result: any = await pythonExecutor(req.body.id, req.body.code, req.body.testCases, req.body.language, req.body.returnType);
        const user = await userModel.findById(req.user._id);
        const passed = result.every((item: any) => item.passed);
        const index = user.submissions.findIndex((item: any) => item._id === req.params.id);
        if (index === -1) {
            user.submissions.push({
                _id: req.params.id,
                solved: passed
            });
        } else {
            user.submissions[index].solved = passed;
            console.log(user);
        }
        await user.save();
        await submissionsModel.create({
            problem_id: req.params.id,
            user_id: req.user._id,
            passed: passed,
            errorName: passed && result.find((item: any)=> item.exception) ? result.find((item: any)=> item.exception).exception.type : null,
            language: 'python',
            code: req.body.code
        });
        await problemModel.findByIdAndUpdate(req.params.id, {
            $inc: {
                totalSubmissions: 1,
                totalPassed: passed ? 1 : 0
            }
        }, { new: true });
        return res.status(200).send({ message: "Success", data: result });
    } catch (err) {
        throw err
        res.status(500).send({ type: "ERROR", message: err.message });
    }
}
import { Request, Response, Router } from "express";
import { pythonExecutor } from "../../utils/executors/python.executor";
import userModel from "../../models/user.model";
import submissionsModel from "../../models/submissions.model";

export const getSubmissions = async (req: Request, res: Response) => {
    try {
        const submissions = await submissionsModel.find({ problem_id: req.params.id, user_id: req.user._id });
        return res.status(200).send({ message: "Success", data: submissions });
    } catch (err) {
        res.status(500).send({ type: "ERROR", message: err.message });
    }
}
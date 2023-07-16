import { Request, Response, Router } from "express";
import { pythonExecutor } from "../../utils/executors/python.executor";
import userModel from "../../models/user.model";
import submissionsModel from "../../models/submissions.model";
import problemModel from "../../models/problem.model";

export const editProblem = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).send({ type: "ERROR", message: "User not found" });
        if(!user.isAdmin) return res.status(403).send({ type: "ERROR", message: "You are not an admin" });
        const problem = await problemModel.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send({ message: "Success", data: problem });
    } catch (err) {
        res.status(500).send({ type: "ERROR", message: err.message });
    }
}
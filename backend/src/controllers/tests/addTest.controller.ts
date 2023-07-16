import { Request, Response } from "express"
import testModel from "../../models/test.model"

export const addTest = async (req: Request, res: Response) => {
    try {
        const test = new testModel({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            problems: req.body.problems.map((problem: any) => {
                return {
                    _id: problem.title.replace(/\s/g, '').toUpperCase()+Math.floor(Math.random() * 10000000000000000),
                    ...problem
                }
            }),
            users: [],
            examiner: req.user._id
        })
        await test.save()
        return res.status(200).json({ type: "SUCCESS", message: "Test added successfully" })
    } catch (err) {
        return res.status(500).json({ type: "ERROR", message: err.message })
    }
}
import { Request, Response } from "express"
import problemModel from "../../models/problem.model"


export const addProblem = async (req: Request, res: Response) => {
    try{
        // ID is title without spaces and special characters
        const id = req.body.title.replace(/[^a-zA-Z0-9]/g, '').replace(/-+/g, '_').toUpperCase()
        console.log(id)
        const problemExists = await problemModel.exists({_id: id})
        if(problemExists) return res.status(400).json({type: "ERROR", message: "Problem already exists"})
        const problem = new problemModel({
            // Only keep alphanumeric characters and replace spaces with _
            _id: id,
            title: req.body.title,
            description: req.body.description,
            output_type: req.body.output_type,
            test_cases: req.body.test_cases,
            difficulty: req.body.difficulty,
            tags: req.body.tags,
            input_variables: req.body.input_variables
        })
        await problem.save()
        return res.status(200).json({type: "SUCCESS", message: "Problem added successfully"})
    } catch(err){
        return res.status(500).json({type: "ERROR", message: err.message})
    }
}
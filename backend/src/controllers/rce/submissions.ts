import { Request, Response, Router } from "express";
import Docker from 'dockerode'
import tar from 'tar-stream';
import { pythonExecutor } from "../../utils/executors/python.executor";
function getRunCommand(language) {
    switch (language) {
        case 'c':
            return 'gcc -o /tmp/out /sandbox/code.c && /tmp/out';
        case 'cpp':
            return 'g++ -o /tmp/out /sandbox/code && /tmp/out';
        case 'java':
            return 'javac /code && java -cp /sandbox/code Program';
        case 'python':
            return 'python /sandbox/code.py';
        default:
            throw new Error('Unsupported language');
    }
}
export const submissions = async (req: Request, res: Response) => {
    try{
        const result = await pythonExecutor(req.body.id, req.body.code, req.body.testCases, req.body.language, req.body.returnType);
        return res.status(200).send({message: "Success", data: result});
    } catch(err){
        res.status(500).send({type: "ERROR", message: err.message});
    }     
}
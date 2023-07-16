import express from 'express'
import { submissions } from '../controllers/problem/submissions'
import { addProblemValidator } from '../validators/problems/addProblem.validator'
import { addProblem } from '../controllers/problem/addProblem.controller'
import { authGuard } from '../utils/authGuard'
import { getAllProblems } from '../controllers/problem/getAllProblems.controller'
import { getProblem } from '../controllers/problem/getProblem'
import { getSubmissions } from '../controllers/problem/getSubmissions.controller'
import { editProblem } from '../controllers/problem/editProblem.controller'
import { deleteProblem } from '../controllers/problem/deleteProblem.controller'

const router = express.Router()

router.post('/submit', async(req,res)=>{
    console.log("submit")
    await submissions(req,res)
})

router.post('/add', async(req,res) =>{
    const result = await addProblemValidator(req.body)
    if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
    addProblem(req,res)
})

router.get('/', authGuard, async(req,res)=>{
    getAllProblems(req,res)
})
router.get('/:id', authGuard, async(req,res)=>{
    getProblem(req,res)
})
router.patch('/:id', authGuard, async(req,res)=>{
    editProblem(req,res)
})
router.delete('/:id', authGuard, async(req,res)=>{
    deleteProblem(req,res)
})

router.post('/:id/submit',authGuard, async(req,res)=>{
    await submissions(req,res)
})
router.get('/:id/submissions',authGuard, async(req,res)=>{
    await getSubmissions(req,res)
})
module.exports = router
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
import { addTest } from '../controllers/tests/addTest.controller'
import { getAllTests } from '../controllers/tests/getAllTests.controller'
import { getTest } from '../controllers/tests/getTest'
import { testSubmissions } from '../controllers/tests/testSubmit'
import { getAllStudents } from '../controllers/tests/getAllStudents'
import { getStudentTestSubsmission } from '../controllers/tests/getStudentData'

const router = express.Router()

router.post('/submit', async(req,res)=>{
    await testSubmissions(req,res)
})

router.post('/add', async(req,res) =>{
    addTest(req,res)
})

router.get('/', async(req,res)=>{
    getAllTests(req,res)
})
router.get('/:id', async(req,res)=>{
    getTest(req,res)
}
)

router.get('/:testid/students', async(req, res) => {
    getAllStudents(req, res)
})
router.get('/:testid/student/:id', async(req, res) => {
    getStudentTestSubsmission(req, res)
})
module.exports = router
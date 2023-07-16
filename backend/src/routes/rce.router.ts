import express from 'express'
import { submissions } from '../controllers/problem/submissions'

const router = express.Router()

router.post('/submit', async(req,res)=>{
    console.log("submit")
    await submissions(req,res)
})


module.exports = router
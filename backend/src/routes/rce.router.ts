import express from 'express'
import { submissions } from '../controllers/rce/submissions'

const router = express.Router()

router.post('/submit', async(req,res)=>{
    await submissions(req,res)
})


module.exports = router
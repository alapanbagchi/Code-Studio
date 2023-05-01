import { userEmailVerificationSendController } from './../controllers/user/emailverification.validator';
import { userEmailVerificationSendValidator } from './../validators/users/emailverification.validator';
import express from 'express'

const router = express.Router()

router.post('/register', async(req,res)=>{
    try {
        const result = await userEmailVerificationSendValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userEmailVerificationSendController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})

router.post('/send/emailverification', async(req,res)=>{
    try {
        const result = await userEmailVerificationSendValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userEmailVerificationSendController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})

module.exports = router
import { userLoginController } from './../controllers/user/userLogin.controller';
import { userRegistrationController } from './../controllers/user/register.controller';
import { userRegisterValidator } from './../validators/users/register.validator';
import { userEmailVerificationValidator } from './../validators/users/userEmailVerification.validator';
import { userEmailVerificationSendController } from './../controllers/user/emailverification.validator';
import { userEmailVerificationSendValidator } from './../validators/users/emailverification.validator';
import express from 'express'
import { userEmailVerificationController } from '../controllers/user/useremailverification.controller';
import { userLoginValidator } from '../validators/users/userLogin.validator';
import { me } from '../controllers/user/me.controller';

const router = express.Router()

router.post('/register', async(req,res)=>{
    try {
        const result = await userRegisterValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userRegistrationController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})

router.post('/login', async(req,res)=>{
    try {
        const result = await userLoginValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userLoginController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})

router.post('/verify', async(req,res)=>{
    try {
        const result = await userEmailVerificationValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userEmailVerificationController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})

router.post('/verify/send', async(req,res)=>{
    try {
        const result = await userEmailVerificationSendValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userEmailVerificationSendController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})


router.get('/me', async(req,res) => me(req,res))

router.post('/emailcheck', async(req,res)=>{
    try {
        const result = await userEmailVerificationSendValidator(req.body)
        if(!result.valid) return res.status(400).json({type: "ERROR", message: result.data})
        userEmailVerificationSendController(req,res)
    } catch (error) {
        return res.status(500).json({type: "ERROR", message: error.message})   
    }
})


module.exports = router
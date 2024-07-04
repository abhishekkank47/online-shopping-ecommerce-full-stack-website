import express from 'express'
import {registerController,loginController, testController, forgotPassController,resetPassController} from '../controller/auth.controller.js'
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
const authRouter = express.Router()

//register route
authRouter.post('/register', registerController )

//login route
authRouter.post('/login', loginController) 

//forgot password route
authRouter.post('/forgot-password', forgotPassController) 

//Rest password route
authRouter.post('/reset-pass/:id/:forgotPassToken', resetPassController) 

//testing middleware
authRouter.get('/test', requireSignIn, testController)

//protected Route for

//user Dashboard
authRouter.get('/user-auth', requireSignIn, (req,res)=>{
  res.status(200).send({ ok: true })  
})
//admin Dashboard
authRouter.get('/admin-auth', requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ ok: true })  
})



export default authRouter
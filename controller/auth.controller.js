import { comparePassword, hashPassword } from "../helper/regiter.helper.js"
import UserModel from "../config/models/user.model.js"
import JWT from "jsonwebtoken"
import nodemailer from "nodemailer"


//register route
const registerController = async(req,res)=>{
    try {
        const{name,email,phone,password,address}=req.body
        console.log(`Register Request Recived${JSON.stringify(req.body)}`)
        if(!name || !email || !password || !address || !phone ){
            return res.status(400).send({message: 'All feild are required'})
        }
        

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.status(200).send({
                success:false,
                message:'User already regiter, Please Login'
            })
        }

        const passwordHashed = await hashPassword (password)
        const user = new UserModel({name,email,phone,address,password:passwordHashed}).save()

        res.status(201).send({
            success:true,
            message:'USER REGISTER SUCCESSFULLY',
            user,
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'ERROR IN REGISTRATION',
            error,
        })
    }
} 

//login route
const loginController = async (req,res)=>{
try {
    const {email,password} = req.body
    console.log(`Login Request Recived${JSON.stringify(req.body)}`)
    if (!email || !password){
        return res.status(404).send({
            success:false,
            message:"INVALID EMAIL OR PASSWORD"
        })
    }

const user = await UserModel.findOne({email})
if(!user){
    return res.status(404).send({
        sucess:false,
        message:'EMAIL IS NOT REGISTRED',
    })
}

const matchPassword = await comparePassword(password,user.password)
if(!matchPassword){
    return res.status(200).send({
        success:false,
        message:'INVALID PASSWORD'
    })
}
 
//jwt token
const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn :'90d'})
res.status(200).send({
    success:true,
    message:'LOGIN SUCESSFULLY',
    user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        password:user.password,
        role:user.role
    },token
})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'ERROR IN LOGIN',
        error
    })

    
}
}

//forgot password
const forgotPassController = async (req,res)=>{
    try {
        const {email} = req.body
    console.log(`Password Reset Request Recived${JSON.stringify(req.body)}`)
    if (!email){
        return res.status(404).send({
            success:false,
            message:"EMAIL IS REQUIRED"
        })
    }

const user = await UserModel.findOne({email})
if(!user){
    return res.status(404).send({
        sucess:false,
        message:'EMAIL IS NOT REGISTRED',
    })
}

//token genration for forgot password
const forgotPassToken = await JWT.sign({id:user._id}, process.env.JWT_SECRET_FORGOT_PASS,{expiresIn:"1d"})



//imported and installed nodemailer and on w3school nodemailer code copy pasted
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ID_ADMIN}`,
      pass: `${process.env.EMAIL_ID_ADMIN_password}` //generate app password by login inside device with email
    }
  });
  
  var mailOptions = {
    from: `${process.env.EMAIL_ID_ADMIN}`,
    to: 'abhishekkank5@gmail.com',
    subject: 'Reset Your Password of ECOMMERCE SHOP',
    text: `http://localhost:5173/reset-pass/${user._id}/${forgotPassToken} Click Here to Reset Password` //change here
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      return res.send({status:"Success"}) //change here
    }
  })} catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:'SOMETHING WENT WRONG',
            error
        })
    }


}

//reset password
const resetPassController = (req,res)=>{
    const{id,forgotPassToken}= req.params
    const{newpassword}=req.body

    JWT.verify(forgotPassToken,process.env.JWT_SECRET_FORGOT_PASS,(err, decoded)=>{
        if(err){
            return res.send({status:"ERROR WITH TOKEN"})
        } else{
           const hashed = passwordHashed(newpassword)
            UserModel.findByIdAndUpdate({_id: id},{password:hashed})
           res.status(200).send({
            success:true,
            message:"PASSWORD RESET SUCCESEFULLY"
           })
        }
    })
    try {
        res.send("protected Route")
        console.log("protected")
    } catch (error) {
        console.log(error)
    }
}

//testing purpose
const testController = (req,res)=>{
    try {
        res.send("protected Route")
        console.log("protected")
    } catch (error) {
        console.log(error)
    }
}

export {registerController,loginController,forgotPassController,resetPassController, testController}



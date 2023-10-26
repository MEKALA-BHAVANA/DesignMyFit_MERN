const Registration=require("../models/Registration")
const bcrypt=require('bcrypt')
//const Item=require('../models/Item')
const crypto = require('crypto');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
 
const Register= async(req,res)=>{
  const verificationToken = crypto.randomBytes(40).toString('hex');
  let newUser;
  const Fullname =req.body.name;
  const gmail=req.body.email; 
  const password = req.body.password;
  console.log(Fullname, gmail, password);
  // const user=await Registration.findOne({gmail});
  // if(user){
  //   res.status(403).json({ message: 'email already present' });
  //   return;
  // } 
   
   
  newUser = await Registration.create({
    Fullname,
    gmail,
    password
  })
     
   
  //  const origin = 'http://localhost:3000';
  //  await sendVerificationEmail({
  //   name: newUser.Fullname,
  //   gmail: newUser.gmail,
  //   verificationToken: newUser.verificationToken,
  //   origin,
  // });
  
   
  // res.status(StatusCodes.CREATED).json({
  //   message: 'Success! Please check your email to verify account',
  // });
//  res.status(200).send({ message: 'Account Created!.'});
  
  
}
const verifyEmail = async (req, res) => {
  const { verificationToken, gmail } = req.body;
  const user = await Registration.findOne({ gmail });
    if (!user) {
     res.status(403).json({ message: 'Verification Failed' });
    }

  if (user.verificationToken === verificationToken) {
    res.status(403).json({ message: 'Verification Failed' });
  }
  (user.isVerified = true), 
  (user.verified = Date.now());
   user.verificationToken = '';
  await user.save();
   
  res.status(200).json({ message: 'Email Verified' });
};

const Login=async (req,res) =>{
  const gmail=req.body.email;
  const password=req.body.password;
   console.log(gmail,password)
  if (!gmail || !password) {
    
    return res.status(401).send({message:"Please correct provide email and password"})
  }
  const user = await Registration.findOne({ gmail });
   
  if (!user) {
    //throw new CustomError.UnauthenticatedError('Invalid Credentials');
   return  res.status(401).send({message:"Invalid gmail"})
  }
   
   const isPasswordCorrect = await user.comparePassword(password);
   
   if (!isPasswordCorrect) {
    //throw new CustomError.UnauthenticatedError('Invalid Credentials');
    return res.status(401).send({message:"password is incorrect"})
  }
   
     
}
  
const Forgotpassword = async (req, res) => {
  const gmail  = req.body.email;
  if (!gmail) {
    return res.status(401).send({message:"please enter valid email account"})
  }
  const user = await Registration.findOne({ gmail });
  if(!user){
    return res.status(401).send({message:"please enter valid email account"})
  }
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');
    const origin = 'http://localhost:3000';
    await sendResetPasswordEmail({
      name: user.Firstname,
      gmail: user.gmail,
      token: passwordToken,
      origin,
    });
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }
  res.status(200).send({message:"Please check your email for reset password link"})
};
const Reset=async(req,res)=>{
  const { verificationToken, gmail,password } = req.body;
  //console.log(verificationToken, gmail,password)
  if (!verificationToken|| !gmail || !password) { 
   return  res.status(400).send({msg:"Please provide all values"})
  }
  const user = await Registration.findOne({ gmail });
  //console.log(user)
  if (user) {
    const currentDate = new Date();
        if (user.passwordToken === createHash(verificationToken) && user.passwordTokenExpirationDate > currentDate)
        { 
          user.password = password;
          user.passwordToken = null;
          user.passwordTokenExpirationDate = null;
          await user.save();
        }
   }

  res.status(200).send( {message:"Rreset password sucessfully"});
   

}
   
module.exports={Register,Login,Reset,verifyEmail,Forgotpassword}



 
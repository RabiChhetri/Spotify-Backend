const userModel = require("../models/user.model");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

async function registerUser(req,res) {
    const {username,email,password,role}=req.body
    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(401).json({
            message:'User already Exists'
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,email,password:hash,role
    })
    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.  JWT_SECRET)
    res.cookie('token',token)
    res.status(201).json({
        message:('User Register Succesfully')
    })
}

async function loginUser(req,res) {
    const{username,email,password,role="user"}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(409).json({
            message:'Invalid Credential'
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(409).json({
            message:'Invalid Credential'
        })
    }
    const token=jwt.sign({
    _id:user._id,
    role:user.role
    },process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(200).json({
        message:'Login Successfully'
    })
}

async function logOut(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"User Logout Sucessfully"
    })
}

module.exports={registerUser,loginUser,logOut}
const User=require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail= require('../utils/sendEmail');

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'});
};
const registerUser= async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const existingUser =await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role:role?.toLowerCase()
        });
       
        if(user){
            const otp= Math.floor(100000 + Math.random() * 900000).toString();

            const message=`
            welcome to shopnest ,your otp is ${otp}`

            await sendEmail(email, 'welcome to shopnest-your otp for registration',message);

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id) 
            });
    }
    else{
        res.status(400).json({message:"Invalid user data"});
    }
}   
catch (error){
        console.error("Register user error:", error);
        res.status(500).json({message:"Internal server error"});
    }
};

const LoginUser =async(req,res)=>{
const {email,password}=req.body;
try{
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        });
    }else{
        res.status(401).json({message:'Invalid email or password'});
    }
}
catch(error){
    console.error("Login user error:", error);
    res.status(500).json({message:'Internal server error'});
}
};
 
const getUsers= async(req,res)=>{
    try{
        const users= await User.find({}).select('-password');
        res.json(users);
    }catch(error){
        console.error("Get users error:", error);
        res.status(500).json({message:'Internal server error'});
    }
};

module.exports={
    registerUser,
    LoginUser,
    getUsers
};

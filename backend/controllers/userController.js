import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
// import jwt from "jsonwebtoken";
import  createToken  from "../utility.js";


//CONTROLLER FOR HANDLING USER LOGIN
const loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;
        
        //check if user exists
        const userExists = await userModel.findOne({email});

        if(!userExists){
            return res.status(400).json({success:false, message: "User not found, Please register"})
        }

        const isMatch = await bcrypt.compare(password, userExists.password);
        if(!isMatch){
            return res.status(400).json({success:false, message: "Incorrect password"})
        }
        
        //generate jwt token for authenticated user
        const token = createToken(userExists._id)
        
        res.json({success:true, token})
    } catch (error) {
        console.log('error occured: ', error)
        res.status(500).json({success:false, message: error.message})
    }
}

//CONTROLLER FOR HANDLING USER REGISTRATION
const registerUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;

        //checks if user is already registered
        const userExists = await userModel.findOne({email});

        if(userExists){
            return res.status(400).json({success:false, message: "User already exists"})
        }

        //checking for email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message: "Please enter a valid email"})
        }
        if(password.length < 8){
            return res.status(400).json({success:false, message: "Password must be atleast 8 characters"})
            
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user and save to database
        const userInfo =  new userModel({
            name, email, password: hashedPassword
        })


        const user = await userInfo.save()

        //generate jwt token for authenticated user
        console.log(user._id)
        const token = createToken(user._id)
        console.log('token: ',token)
        //send jwt token to the client
        res.json({success: true, token})
    } catch (error) {
        console.log("error occurred: ", error.message)
        res.status(400).json({success: false, message: "Server Error"})
    }
}



//CONTROLLER FOR HANDLING ADMIN LOGIN
const adminLogin = async(req, res) =>{
    try {
        const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = createToken(email+password)
        res.json({success: true, token})
    }else{
         res.status(401).json({success: false, message: "Invalid credentials"})
    }
    } catch (error) {
        console.log(error.message)
         res.status(500).json({success: false, message: error.message})
    }
    
}

export {loginUser, registerUser, adminLogin} 
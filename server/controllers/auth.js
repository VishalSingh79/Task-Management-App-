//               1.)sendOtp    2.)signUp       3.)login       4.)changePassword

const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mailSender=require("../utils/mailSender")
const emailTemplate = require("../utils/mailTemplate");


require("dotenv").config();

                                //otp generation

exports.sendotp=async(req,res)=>{
  try {
         //fetch email from req.body
         const {email}=req.body;
 
         //checking if user already exist or not
         const isExist=await User.findOne({email});

         if(isExist){
            return res.status(409).json({
            success:false,
            message:"User already Registered"
            })
        }

        //generate otp
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        //checking an otp is unique or not
        
        const uniqueOtp = await OTP.findOne({otp:otp});

        //generating the otp until we get an unique otp
        while(uniqueOtp){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            uniqueOtp = await OTP.findOne({otp:otp});
        }

        //creating a entry in your database
        
         const otpBody=await OTP.create({
            email,
            otp
         })
         
         res.status(200).json({
            success:true,
            message:"Successfully send an otp",
            data:otpBody,
         })


  } catch (error) {
     res.status(500).json({
        success:false,
        message:"Error while sending otp"
     })
  }
   
}

                                            //signup

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, otp } = req.body;
      
        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User is already Registered. Please sign in to continue.."
            });
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        // Ensure recentOtp is found and contains data
        if (!recentOtp || recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createEntry = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
        });
        
        return res.status(200).json({
            success: true,
            message: "Your Account is created in our database",
            data: createEntry
        });

    } catch (error) {
        console.error("Signup error: ", error); // Log the error for better debugging
        return res.status(500).json({
            success: false,
            message: "Error while signing up"
        });
    }
};


                                            //login

exports.login = async (req,res)=>{
    try {
        //fetching the data from the request body
        const {email,password}=req.body;

        //validating the user
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill the login form carefully"
            })
        }
        //checking user exist in our database or not
        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"You are not a registered User. Please Signup first"
            })
        }

        //Matching the password
        const matched = await bcrypt.compare(password,user.password);

        if(!matched){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        //generating the JWT
        const payload={
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,        
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"72h"});
        
        user.token=token;
        user.password=undefined;

        //create cookie and send response
        const options = {
            expires: new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"Logged In successfully",
            data:token,
            
        })

    } catch (error) {
        console.log("Error in logging ", error);
        return res.status(500).json({
            success:false,
            message:"Loggin failed, Please try again"
        })
    }
}

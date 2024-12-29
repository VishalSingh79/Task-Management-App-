const jwt = require("jsonwebtoken");
require("dotenv").config();


//Authenticity checking
exports.auth= async(req,res,next)=>{
    try {
        
        const token = 
        req.body.token || 
        req.cookies.token || 
        (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);
       //if token is missing then return the response
        console.log("TOKEN",token);
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing. Please login or sign up"
            });
        }
        
        //verifying the token
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode",decode);
            req.user=decode;
    
        } catch (error) {
            res.status(401).json({
                error:error.message,
                success:false,
                message:"Login or Sign up in decoding the token"
            })
        }
       
        next();

    } catch (error) {
        console.log("Error in the authencityCheck ",error);
        return res.status(500).json({
            success:false,
            message:"Error in authencityCheck"
        })
    }


}

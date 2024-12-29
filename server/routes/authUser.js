const express=require("express");
const router=express.Router();
const {signup,login,sendotp}=require("../controllers/auth");

//Route for user signup
router.post("/signup",signup);

//Route for user login
router.post("/login",login);

//Route for sending otp
router.post("/sendotp",sendotp);

module.exports=router;
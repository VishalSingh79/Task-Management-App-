const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../utils/mailTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60 // OTP expires after 5 minutes
    }
});

// Send email 
async function verificationEmail(email, otp) {
    try {
        const emailResponse = await mailSender(email, "Email Verification from Task Management", emailTemplate(otp));
        console.log("Email sent Successfully -> ", emailResponse);
    } catch (error) {
        console.log("Error while sending the Verification email");
        console.error(error);
    }
}

// pre-save middleware (when we use OTP.create() method, this middleware will be called and send an email to the user)
otpSchema.pre("save", async function (next) {
    // Only send an email when a new document is created
    if (this.isNew) {
        await verificationEmail(this.email, this.otp);
    }
    
    next();
});

module.exports = mongoose.model("OTP", otpSchema);

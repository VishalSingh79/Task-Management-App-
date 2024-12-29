import { endpoints } from "../allAPI"
import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector";
import { setToken } from "../../slices/authSlice";



export const loginUP= async(data,navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
         
        const response =await apiConnector("POST",endpoints.LOGIN_API,{
            email:data.email,
            password:data.password
        });
        
      
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
        console.log(response.data.data)
        toast.success("Your are Successfully Login!!");
        toast.dismiss(toastId);
        dispatch(setToken(response.data.data));   
        
      //  console.log("User Data -> ",response.data.user);
        return navigate("/tasklist");

    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        if (error.response) {
            // Check if there is a specific error response from the server
            const { status, data } = error.response;
            if (status === 400 && data.message == "You are not a registered User. Please Signup first") {
                return toast.error("Create a account first!!");
            }
        }
        toast.error(error.response.data.message || "Error in Login");
    }

}

export const sendOtp = async (data, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, {
            email: data.email,
            checkUserPresent: true,
        });

        console.log(response.data);
        
        if (!response.data.success) {
            toast.dismiss(toastId); 

            if (response.data.message === "User already Registered") {
                return toast.error("User already exists. Please log in.");
            }

            return toast.error("Error in sending OTP");
        }

        // If OTP is sent successfully
        toast.success("OTP sent Successfully");
        toast.dismiss(toastId);  
        return navigate("/verify-email");

    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        if (error.response) {
            // Check if there is a specific error response from the server
            const { status, data } = error.response;
            if (status === 409 && data.message === "User already Registered") {
                return toast.error("User already exists. Please log in.");
            }
        }
        toast.error("Error in verifying the email");
    }
};

export const signup = async (data, otpValue, navigate) => {
    console.log("Data",data);
    const toastId = toast.loading("Loading...");
    try {
       
        const response =await apiConnector("POST", endpoints.SIGNUP_API, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            otp: otpValue
        });


        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Signing Up");
        }

        toast.success("Your account is successfully created!");
        toast.dismiss(toastId);
        return navigate("/login");

    } catch (error) {
        toast.error("Error in signing up");
        console.error("Signup Error:", error);
        toast.dismiss(toastId);
        
    }
};

export  const logout =async(navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.dismiss(toastId);
    
    toast.success("Successfully Log out!");
    navigate('/login');
}
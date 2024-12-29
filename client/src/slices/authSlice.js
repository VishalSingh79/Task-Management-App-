import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    signUpData : null ,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken :(state,action)=>{
        state.token =action.payload;
        localStorage.setItem("token",JSON.stringify(action.payload));
        },
        setSignUpData : (state ,action)=>{
            state.signUpData = action.payload;
        },

  }
})

export const {setToken,setSignUpData} =authSlice.actions;
export default authSlice.reducer;
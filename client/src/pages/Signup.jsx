import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Login.css"
import {useForm} from 'react-hook-form';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Services/Operations/authService';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../slices/authSlice';
import { sendOtp } from '../Services/Operations/authService';



function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const form = useRef();
    const onSubmit=(data)=>{
        dispatch(setSignUpData(data));
        sendOtp(data,navigate);
     //   loginUP(data,navigate,dispatch);
     console.log("Data",data);
    }
  
   
  

  return (
    <div className='container'>
      <h2 className='signup-title'>Sign up to Task Management App</h2>
      <form onSubmit={handleSubmit(onSubmit)} ref={form} className='login-form'>
          <div>
             <p style={{textAlign:"left",margin:"0rem"}}>
                <label htmlFor='firstname' className='label'>First Name</label>
             </p>
             <p style={{margin:"0rem"}}>
                <input type='text' placeholder='Enter Your First Name' name='firstname' id='firstname' required
                   {...register('firstName', { required: "First Name is required**" })}
                />
                <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
             </p>
          </div> 

          <div>
             <p style={{textAlign:"left",margin:"0rem"}}>
                <label htmlFor='firstname' className='label'>Last Name</label>
             </p>
             <p style={{margin:"0rem"}}>
                <input type='text' placeholder='Enter Your Last Name' name='lastname' id='lastname' required
                   {...register('lastName', { required: "Last Name is required**" })}
                />
                <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
             </p>
          </div> 

          <div>
             <p style={{textAlign:"left",margin:"0rem"}}>
                <label htmlFor='email' className='label'>Email Address</label>
             </p>
             <p style={{margin:"0rem"}}>
                <input type='email' placeholder='Enter Your Email' name='email' id='email' required
                   {...register('email', { required: "Email is required**" })}
                />
                <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
             </p>
          </div> 
          
          <div>
            <p style={{textAlign:"left",margin:"0rem"}}>
                  <label htmlFor='password' className='label'>Password</label>
            </p>            
               <p style={{margin:"0rem",position:"relative"}}>
                 <p style={{margin:"0rem"}}>
                    <input type="password" placeholder='Enter Your Password' name='password' id='password' required 
                          {...register('password', { required: "Password is required**" })}
                    />
                 </p>     
               </p>
                <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>

          </div>             
          <button className='btn-submit'>Sign up</button>

         </form>
    </div>
  )
}

export default Signup

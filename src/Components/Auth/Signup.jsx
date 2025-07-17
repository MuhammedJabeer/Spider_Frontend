import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import './Signup.css';
import axios from "../../axios/axios";
import { toast } from 'react-toastify';
function Signup() {
   
 const [formdata,setFormdata]=useState({
        username:"",
        email:"",
        password:""
     })

     const handlechange=(e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
        console.log('data',formdata);
        
     }
  const handlesubmit=async(e)=>{
     e.preventDefault();

     try {
          if (!formdata.username || !formdata.email || !formdata.password) {
               toast.error("Please fill all fields");
                    return;
                }

          const response=await  axios.post('/signup',formdata)
          console.log(response.data);
          setFormdata({ username: "", email: "", password: "" });
          toast.success(response.data.message);
     } catch (error) {
        toast.error("Invalid credentials")
        setFormdata({ username: "", email: "", password: "" });
     }
  }
  return (
    <>
      
         <div className="signup-page">
           <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={handlesubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username"  name="username"  value={formdata.username} onChange={handlechange}/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email"  value={formdata.email} onChange={handlechange}/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password"  name="password" value={formdata.password} onChange={handlechange}/>

    
        <button type="submit">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <NavLink to="/Signin">Sign In</NavLink>
      </p>

        {/* <p className="login-link">
            Back to Home? <NavLink to="/" end>Home</NavLink>
      </p> */}
       
    </div>
   
         
        </div>


    </>
  )
}

export default Signup

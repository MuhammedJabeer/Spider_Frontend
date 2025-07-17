import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "../../axios/axios";
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/Authcontext';
import { jwtDecode } from 'jwt-decode';
function Signin() {
const navigate=useNavigate()
const [formdata,setFormdata]=useState({
        email:"",
        password:""
     })
const { setToken, Setuser }=useAuth()


const handlechange=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
}

const handlesubmit=async(e)=>{
         e.preventDefault();
        try {
            if(!formdata.email||!formdata.password){
                toast.error("fill the filed")
                return
            }
            const response=await axios.post("/signin",formdata)
             console.log("signin",response.data.message);
              const token = response.data.token;
              localStorage.setItem("token", token);
              const decoded = jwtDecode(token);
              setToken(token);
              Setuser(decoded);
            toast.success(response.data.message)
            navigate('/home')
        } catch (error) {
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                 toast.error('Invalid credentials')
            }
            
        }
}

  return (
    <>
       <div className="signup-page">
                 <div className="signup-container">
            <h2>Sign In</h2>
      
            <form onSubmit={handlesubmit} >
            
      
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formdata.email} onChange={handlechange} />
      
              <label htmlFor="password">Password:</label>
              <input type="password" id="password"  name="password" value={formdata.password} onChange={handlechange} />
      
          
              <button type="submit">Sign In</button>
            </form>
      
            <p className="login-link">
              Don’t have an account? <NavLink to="/">Signup</NavLink>
            </p>
            </div>
            </div>
    </>
  )
}

export default Signin

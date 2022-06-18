import React from 'react'
import "./register.css"

import { useState } from 'react'
import {useNavigate} from "react-router-dom";

import  axios  from 'axios'

export const Register = (props) => {

    //*Router
    const navigate = useNavigate()

    //* Register Variables
    let [data,setData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confpassword : ""
    })

    let[errors,setErrors] = useState({})


    const handleInputChange = (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const register = (e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8080/api/users/register",data)
        .then(data=>{
            console.log(data.data);
            sessionStorage.setItem("userinfo", JSON.stringify(data.data));
            // window.location.replace("/home")
            navigate("/home")
        })
        .catch(error=>{
            setErrors(error.response.data)
        })
    }

    return (
        <div className='all'>
            <h1>Register</h1>
            
            <form className='registerform' onSubmit={register}>
                <div>
                    <p className='errormsj'>{errors.empty ? errors.empty : ""}</p>
                    <p className='errormsj'>{errors.passnotmatch ? errors.passnotmatch : ""}</p>
                </div>
                <label className='formlabel'>First Name:</label>
                <input className='reg-input' type="text" name="firstname" placeholder="Insert your First Name" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.firstnlen ? errors.firstnlen : ""}</p>
                    <p className='errormsj'>{errors.firstnlen2 ? errors.firstnlen2 : ""}</p>
                </div>
                
                <label className='formlabel'>Last Name:</label>
                <input className='reg-input' type="text" name="lastname" placeholder="Insert your Last Name" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.lastnlen ? errors.lastnlen : ""}</p>
                    <p className='errormsj'>{errors.firstnlen2 ? errors.firstnlen2 : ""}</p>
                </div>

                <label className='formlabel'>Email:</label>
                <input className='reg-input' type="text" name="email" placeholder="Insert your email" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.emailExist ? errors.emailExist : ""}</p>
                </div>

                <label className='formlabel'>Password:</label>
                <input className='reg-input' type="password" name="password" placeholder="Insert your password" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.passlen ? errors.passlen : ""}</p>
                </div>

                <label className='formlabel'>Confirm Password:</label>
                <input className='reg-input' type="password" name="confpassword" placeholder="Insert confirmation" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.passlen2 ? errors.passlen2 : ""}</p>
                </div>

                <button  type="submit" className="btn btn-warning mt-5 reg-but">Register</button>
            </form>
        </div>
    )
}



export default Register
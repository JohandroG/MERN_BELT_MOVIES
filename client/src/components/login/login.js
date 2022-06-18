import React from 'react'
import "./login.css"

import { useState } from 'react'
import {useNavigate} from "react-router-dom";


import  axios  from 'axios'

export const Login = (props) => {

    //*Router
    const navigate = useNavigate()

    //* Login Variables
    let [data,setData] = useState({
        email : "",
        password : "",
    })

    let[errors,setErrors] = useState({})


    const handleInputChange = (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const login = (e)=>{

//
        e.preventDefault();
        axios.post("http://localhost:8080/api/users/login",data)
        .then(data=>{
            sessionStorage.setItem("userinfo", JSON.stringify(data.data));
            navigate('/home')
        })
        .catch(error=>{
            setErrors(error.response.data)
        })
    }

    return (
        <div className='all'>
            <h1>Login</h1>
            <form className='registerform' onSubmit={login}>

                <div>
                    <p className='errormsj'>{errors.empty ? errors.empty : ""}</p>
                </div>

                <label className='formlabel'>Email:</label>
                <input className='log-input' type="text" name="email" placeholder="Insert your email" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.adminerror ? errors.adminerror : ""}</p>
                </div>

                <label className='formlabel'>Password:</label>
                <input className='log-input' type="password" name="password" placeholder="Insert your password" onChange={handleInputChange}/>
                <div>
                    <p className='errormsj'>{errors.passworderror ? errors.passworderror : ""}</p>
                </div>

                <button type="submit" className="btn btn-info mt-5 log-but">Login</button>
            </form>
        </div>
    )
}



export default Login
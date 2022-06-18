import React from 'react'

import { useState, useEffect, useRef } from 'react'
import {useNavigate, Link} from "react-router-dom";
import  axios  from 'axios'

import "./newmovie.css"

export const Newmovie = () => {

    //*Router
    const navigate = useNavigate()
    const ref = useRef(null)

    let[userinfo,setUserinfo] = useState({})

        //* Register Variables
        let [data,setData] = useState({
            title : "",
            creator : "",
            review : "",
            rating : 1,
        })
    
        let[errors,setErrors] = useState({})
    
    

        useEffect(()=>{
            setUserinfo(JSON.parse(sessionStorage.getItem('userinfo')) )
            secroute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    
    
        const secroute = ()=>{
            let usinfo = JSON.parse(sessionStorage.getItem('userinfo'))
            if(!usinfo){
                navigate("/")
            }
        }

        const handleSelectChange = (e)=>{
            let selectorVal = document.getElementById('rating').value
            setData({...data, rating : selectorVal})
        }

        const handleInputChange = (e)=>{
            setData({...data,[e.target.name] : e.target.value})

            if(data.creator === ""){
                setData({...data, creator: `${userinfo.firstname} ${userinfo.lastname}`})
            }
        }

        const newMovie = (e)=>{
            e.preventDefault()

            axios.post("http://localhost:8080/api/movies/create",data)
            .then(data=>{
                console.log(data.data);
                navigate("/home")
            })
            .catch(error=>{
                setErrors(error.response.data)
            })
        }


return (
    <div>
        <div className='home-nav'>
            <h1>Moldy Tomatoes</h1>
        </div>

        <div>

            <div className='form-field'>
                <div className='box-form'>
                    <h1>Submit a Movie and A Review</h1>

                    <div>
                    <p className='errormsj'>{errors.empty ? errors.empty : ""}</p>
                    <p className='errormsj'>{errors.rev ? errors.rev : ""}</p>
                    </div>

                    <form onSubmit={newMovie}>
                    <div className='p-3'>
                        <label className='formlabel text-start label-text mx-2'>Movie Title:</label>
                        <input className='w-25' type="text" name="title" onChange={handleInputChange}/>
                    </div>

                    <div className='p-3'>
                        <label className='formlabel text-start label-text mx-2'>Rating:</label>
                        <select name="rating" className='w-25' onChange={handleSelectChange} ref={ref} id="rating">
                            <option value={1}>1 ⭐</option>
                            <option value={2}>2 ⭐⭐</option>
                            <option value={3}>3 ⭐⭐⭐</option>
                            <option value={4}>4 ⭐⭐⭐⭐</option>
                            <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                    <div className='p-3'>
                        <label className='formlabel text-start label-text mx-2'>Your Review:</label>
                        <textarea className='w-25' type="text" name="review" onChange={handleInputChange}></textarea>
                    </div>

                    <div className='buts'>
                        <button  type="submit" className="btn btn-primary m-2 mx-3">Submit</button>
                        <Link className='btn btn-danger m-2 mx-3' to={"/home"}>Cancel</Link>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newmovie
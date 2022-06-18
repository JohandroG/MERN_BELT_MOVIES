import React from 'react'


import { useState, useEffect, useRef } from 'react'
import {useNavigate, Link, useParams} from "react-router-dom";
import  axios  from 'axios'

export const Newreview = () => {

//*Router
const navigate = useNavigate()
const ref = useRef(null)

const {id} = useParams();

let[userinfo,setUserinfo] = useState({})

    //* Register Variables
    let [data,setData] = useState({
        _id : "",
        creator : "",
        review : "",
        rating : 1,
    })


    let[errors,setErrors] = useState({})

    let [movie, setMovie] =  useState([])
    let [reviews, setReviews] =  useState([])

    useEffect(()=>{
        setUserinfo(JSON.parse(sessionStorage.getItem('userinfo')) )
        secroute()
        axios.get(`http://localhost:8080/api/movies/get/movie/${id}`)
        .then(result=>{
            setReviews(result.data.reviews)
            setMovie(result.data)
        })
        .catch(err=>{
            console.log(err);
        })


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
          setData({...data, creator: `${userinfo.firstname} ${userinfo.lastname}`,
          _id: `${id}`})
        }

        console.log(data.rating);
    }

    const newReview = (e)=>{
        e.preventDefault()

          axios.post("http://localhost:8080/api/movies/addreview",data)
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
                <h1>Submit a Review for {movie.title}</h1>

                <div>
                <p className='errormsj'>{errors.empty ? errors.empty : ""}</p>
                <p className='errormsj'>{errors.rev ? errors.rev : ""}</p>
                </div>

                <form onSubmit={newReview}>

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

export default Newreview
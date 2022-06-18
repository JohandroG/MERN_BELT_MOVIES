import React from 'react'
import "./moviereviews.css"

import { useState, useEffect } from 'react'
import {useNavigate, Link, useParams} from "react-router-dom";
import  axios  from 'axios'


export const Moviereviews = () => {
    //*Router
    const navigate = useNavigate()

    let[userinfo,setUserinfo] = useState({})

    let [movie, setMovie] =  useState([])
    let [reviews, setReviews] =  useState([])
    

    const {id} = useParams();

    useEffect(()=>{
        setUserinfo(JSON.parse(sessionStorage.getItem('userinfo')) )
        secroute()

        axios.get(`http://localhost:8080/api/movies/get/movie/${id}`)
        .then(data=>{
            setReviews(data.data.reviews)
            setMovie(data.data)
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

    const logout = ()=>{
        sessionStorage.clear()
        navigate("/")
    }

    const deleteMovie = ()=>{
        axios.delete(`http://localhost:8080/api/movies/delete/${id}`)
        .then(data=>{
            navigate("/home")
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const deleteReview = (e)=>{
        axios.delete(`http://localhost:8080/api/movies/delete/rev/${e.target.rev_id.value}`)
        .then(data=>{
            console.log("Deleted");
        })
        .catch(err=>{
            console.log(err);
        })
    }


  return (
    <div>
        <div className='home-nav'>
            <h1>Moldy Tomatoes</h1>
            <button className='btn btn-danger px-4 ' type='button' onClick={logout}>Log Out</button>
        </div>

        <div className='home-main'>

                <div className='main-top'>
                    <h1>Reviews for {movie.title}</h1>
                    <Link className='btn btn-primary' to={"/home"}>📽️ Go Back</Link>
                </div>

                <div className='tablecontainer'>
                    <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Reviewer</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review,index)=>{
                                return(
                                    <tr key={index}>
                                        <td key={review.title+index}>
                                            {review.creator}
                                            <form className='delrev' onSubmit={deleteReview}>
                                                <input type='hidden' name="rev_id" value={review._id}></input>
                                                <button type='submit' className='deleterev mx-3' >
                                                    {review.creator === `${userinfo.firstname} ${userinfo.lastname}` ? "❌🗑️" : ''}
                                                </button>
                                            </form>
                                        </td>
                                        <td key={review.title+index+"2"}>
                                            {review.rating}
                                        </td>
                                        <td key={review.title+index+"3"}>
                                        {review.review}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>

                <div className='main-top'>
                    <button type='submit' className='btn btn-danger' onClick={deleteMovie}>Delete Movie</button>
                </div>



            </div>
    </div>
  )
}

export default Moviereviews
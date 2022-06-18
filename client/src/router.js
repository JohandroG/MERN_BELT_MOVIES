import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Myaccount from "./components/myaccount/myaccount";
import Home from './components/home/home';
import Register from './components/register/register';
import Login from './components/login/login';
import Newmovie from './components/newmovie/newmovie';
import Newreview from './components/newreview/newreview';
import Moviereviews from './components/moviereviews/moviereviews';

//-
const RouterComp = () => {
return (
    <Router className="container">

    <Routes>
        <Route path="/movies/:id/review" element={<Newreview/>} exact></Route>
        <Route path="/movies/:id" element={<Moviereviews/>} exact></Route>
        <Route path="/movies/new" element={<Newmovie/>} exact></Route>
        <Route path="/home" element={<Home/>} exact></Route>
        <Route path="/" element={<Myaccount/>} exact></Route>
    </Routes>
    </Router>
)
}

export default RouterComp
import React from 'react';
import './myaccount.css'

import Login from "../login/login"
import Register from "../register/register"

const Myaccount = () =>{
    return(
        <React.Fragment>
            <div className='main'>
                <Register></Register>
                <Login></Login>
            </div>
        </React.Fragment>
    )
}

export default Myaccount;
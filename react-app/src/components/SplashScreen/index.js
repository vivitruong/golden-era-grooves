import React, { useState } from "react";
import './style.css'
import { Redirect, useHistory } from "react-router-dom";

function SplashScreen() {
    const history = useHistory();

    const redirectToMainPage = ()=> {
        history.push('/')
    }
    return (
        <>
        <div className="splash-page">

        <img className='splash-screen-image' src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/splash_logo-removebg.png' alt='splashscreen'/>
        <span onClick={redirectToMainPage}>Click here to enter</span>

        </div>
        </>
    )
}
export default SplashScreen;

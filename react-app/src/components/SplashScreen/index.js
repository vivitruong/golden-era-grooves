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
        <img onClick={redirectToMainPage} className="clickenter" src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/Click+here+to+enter.png"></img>

        </div>
        </>
    )
}
export default SplashScreen;

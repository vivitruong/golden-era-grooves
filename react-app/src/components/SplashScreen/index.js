<<<<<<< HEAD
// SplashScreen.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './style.css';

function SplashScreen() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate a delay (e.g., 3 seconds) for the splash screen
        const delay = setTimeout(() => {
          setIsLoading(false);
        }, 10000); // Adjust the delay to match the animation duration

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(delay);
      }, []);
    //   useEffect(() => {
    //     if (!isLoading) {
    //       // Redirect to the login page after the splash screen
    //       history.push("/login");
    //     }
    //   }, [isLoading, history]);
    const redirectToLoginPage = () => {
      history.push("/login");
    };

    return (
        <div
          className={`splash-page ${isLoading ? "show" : "hide"}`}
          style={{
            backgroundImage: `url("https://goldeneragrooves.s3.us-east-2.amazonaws.com/cloudscreen.jpg")`, // Replace with the actual path to your background image
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <img
            className="splash-screen-image"
            src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/splash_logo-removebg.png"
            alt="splashscreen"
          />
          <img
            onClick={redirectToLoginPage}
            className="clickenter"
            src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/Click+here+to+enter.png"
            alt="Click to enter"
          />
        </div>
      );
    }

    export default SplashScreen;
=======
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
>>>>>>> f812e48879173f209e965f16dcc727c15b858ea0

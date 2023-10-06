// SplashScreen.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './style.css';

function SplashScreen() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        const delay = setTimeout(() => {
          setIsLoading(false);
        }, 10000); //


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

// SplashScreen.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './style.css';
import '98.css'

function SplashScreen() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const delay = setTimeout(() => {
          setIsLoading(false);
        }, 10000);
        return () => clearTimeout(delay);
      }, []);

    const redirectToLoginPage = () => {
      history.push("/login");
    };
    if(sessionUser) return <Redirect to ='/'></Redirect>

    return (
      <>

        <div
          className={`splash-page ${isLoading ? "show" : "hide"}`}
          style={{
            backgroundImage: `url("https://goldeneragrooves.s3.us-east-2.amazonaws.com/background2.jpg")`, // Replace with the actual path to your background image
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
            style={{
              width:'140px',
              marginRight:'-30px',
              marginTop: '-10px'
                        }}
          />
        </div>
        </>
      );
    }

    export default SplashScreen;

import React, { useState, useEffect, useRef } from 'react';
import './style.css'
const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let hourPostFix = 'AM';
    let min = date.getMinutes();
    if (hour >= 12) {
      hour -= 12;
      hourPostFix = 'PM';
    }
    if (hour === 0) {
      hour = 12;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return `${hour}:${min} ${hourPostFix}`;
  };
function Footer() {
    const [time, setTime] = useState(getTime);

    useEffect(() => {
        const timer = setInterval(() => {
          const newTime = getTime();
          newTime !== time && setTime(newTime);
        }, 1000);
        return () => clearInterval(timer);
      }, [time]);


return(

    <>
    <div className='footer'>
    <img className='start-footer' alt='' src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/starttttttt.PNG'></img>
    <div className="footer__time">
        <span>{time}</span></div>
    </div>
    </>
)
}

export default Footer;

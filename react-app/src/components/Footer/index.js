import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './style.css'
import { useSelector } from 'react-redux';
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
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user);
    const openMenu = (e) => {
      e.stopPropagation();
      setShowMenu(true);

  }
  useEffect(() => {
    document.addEventListener('click', e => {
        e.stopPropagation();
        setShowMenu(false);
    });
});

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
    <img className='start-footer'onClick={openMenu} alt='' src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/starttttttt.PNG'></img>
    {
                showMenu &&
                <div className="start-dropdown">
                    <div  className="start-dropdown-info start-hover">
                        <span className="start-dropdown-content" style={{cursor:"default"}}>Hello, {user.firstName}</span>
                    </div>

                </div>
            }
    <div className="footer__time">
        <span>{time}</span></div>
    </div>
    </>
)
}

export default Footer;

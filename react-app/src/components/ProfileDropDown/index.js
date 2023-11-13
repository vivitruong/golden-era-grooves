import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import './style.css'

const ProfileDropdown = () => {
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

    return (
        <div>
            <button onClick={openMenu} className="profile-user-btn">

                <img src='https://win98icons.alexmeub.com/icons/png/address_book_user.png'></img>
            </button>
            {
                showMenu &&
                <div className="profile-dropdown">
                    <div  className="profile-dropdown-info profile-hover">
                        <span className="profile-dropdown-content" style={{cursor:"default"}}>Hello, {user.firstName} <img src="https://win98icons.alexmeub.com/icons/png/utopia_smiley.png"></img></span>
                    </div>

                    <Link to='/profile'  className="profile-dropdown-info profile-hover">
                         <span className="profile-dropdown-content">Account <img src="https://win98icons.alexmeub.com/icons/png/write_wordpad-0.png"></img></span>
                    </Link>
                    <div className="profile-logout profile-hover">
                        <LogoutButton/>
                    </div>
                </div>
            }


        </div>
    )
}

export default ProfileDropdown;

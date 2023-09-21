import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu} style={{ cursor: 'pointer' }}>
  {/* <<i className="fas fa-user-circle" />> */}
  <img style={{ width: '30px', height: 'auto' }}  src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/windowPG.png' alt='signup'/>
  <div className="menu-container">
    <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </>
      ) : (

        <div className="menu-items">
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
          </div>

      )}
    </ul>
  </div>
</div>
    </>
  );
}

export default ProfileButton;

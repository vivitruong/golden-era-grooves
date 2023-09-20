import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropDown from './Right/auth/ProfileDropDown';
import { Modal } from './Modal';
import LoginForm from './Right/auth/Login/LoginForm';
// import Player from './Right/Player';

const NavBar = () => {
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e) => {
      e.stopPropagation();
      setShowModal(true);
    }

    return (
      <div className='navbar-container'>
        {/* <Player/> */}
        <div className='navbar-button-signin'>
          {user == null &&
            <div className='navbar-signin' >
                <span onClick={handleClick}>Sign in</span>
                {showModal && (
                      <Modal>
                          <LoginForm onClose={() => setShowModal(false)}/>
                      </Modal>
                  )}
            </div>
          }
          {user !== null &&
            <div>
              <ProfileDropDown />
            </div>
          }
        </div>
      </div>
    );
  }

  export default NavBar;

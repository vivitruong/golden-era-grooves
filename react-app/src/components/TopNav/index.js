import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../ProfileDropDown';
import './style.css'



const TopNav = () => {
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
              {/* {showModal && (
                    // <Modal>
                    //     <LoginForm onClose={() => setShowModal(false)}/>
                    // </Modal>
                )} */}
          </div>
        }


        {user !== null &&
          <div>
            <ProfileDropdown />
          </div>
        }
      </div>
    </div>
  );
}

export default TopNav;

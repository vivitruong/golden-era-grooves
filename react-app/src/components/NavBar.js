// import React from 'react';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// // import ProfileDropDown from './Right/auth/ProfileDropDown';
// import { Modal } from './Modal'
// // import LoginForm from './Right/auth/Login/LoginForm';



// const NavBar = () => {

//     const user = useSelector(state => state.session.user);
//     const [showModal, setShowModal] = useState(false);

//     const handleClick = (e) => {
//       e.stopPropagation();
//       setShowModal(true);
//     }

//     return (
//       <>
//       <div style={{ width: 300 }} className="window">
//       <div className="title-bar">
//         <div className="title-bar-text">Golden Era Grooves</div>
//         <div className="title-bar-controls">
//           <button aria-label="Minimize" />
//           <button aria-label="Maximize" />
//           <button aria-label="Close" />
//         </div>
//       </div>

//       <div className="window-body">
//         <div className="field-row" style={{ justifyContent: "center" }}>
//           <button onClick=''>Sign In</button>
//           <button onClick=''>Sign Up</button>
//           <button onClick=''>Sign Out</button>
//         </div>
//       </div>
//     </div>

//       <div className='navbar-container'>
//         {/* <Player/> */}
//         <div className='navbar-button-signin'>
//           {user == null &&
//             <div className='navbar-signin' >
//                 <button onClick={handleClick}>Sign in</button>
//                 {showModal && (
//                       <Modal>
//                           <LoginForm  onClose={() => setShowModal(false)} />
//                       </Modal>
//                   )}
//             </div>
//           }
//           {user !== null &&
//             <div>
//               <ProfileDropDown />
//             </div>
//           }
//         </div>
//       </div>
//       </>
//     );
//   }

//   export default NavBar;

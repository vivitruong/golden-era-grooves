import React, { useState, useEffect } from "react";
import "./Login.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Login = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      // closeModal();
      console.log("login sucess");
    }
  };
  const demoLogin = async (e) => {
    const email = "demo@aa.io";
    const password = "password";
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data === null) {
      closeModal();
    }
    if (data) {
      setErrors(data);
    }
  };

  // useEffect(() => {
  //   console.log("email:", email);
  //   console.log("password:", password);
  // }, [email, password]);

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
  <div class='centered-container'>
    <div class="title-bar loginmodal">
    <div class="title-bar-text">Log in</div>
    <div className="title-bar-controls">
    <button aria-label="Minimize" />
    <button aria-label="Maximize" onClick={toggleMaximize} />
    <button onClick={closeModal} aria-label="Close" />
    </div>
  </div>
        <div class="window-body">
      <form onSubmit={handleSubmit} className="input-login">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <img className="logo-login" src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/windowPG.png' alt='login'/>
        <span style={{
            color: '#222222',
            textAlign: 'center',
            fontFamily: 'MS Sans Serif Bold',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '12px',

          }}>Golden Era Grooves</span>
        <div class="login-content">
        <div className='login-email login-info'>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
         <div className='login-password login-info'>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            required

          />
          </div>
        </div>
        <div className="down-login">
        <button type="submit">Log In</button>
        <button className="custom-link">
      {/* Use the Link component to navigate to the signup page */}
      <Link to="/signup">Create an account</Link>
    </button>

        <span onClick={demoLogin}>Log in as Demo User</span>
        </div>

      </form>
      </div>

      </div>

  </>
  );
};

import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
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

  return (
    <>

      <div class="title-bar loginmodal">
      <div class="title-bar-text">Log in</div>
      <div className="title-bar-controls">
      <button aria-label="Minimize" />
      <button aria-label="Maximize" />
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
            onChange={(e) => setPassword(e.target.value)}
            required

          />
          </div>
        </div>
        <div className="down-login">
        <button type="submit">Log In</button>
        <span>Create an account</span>
        <span onClick={demoLogin}>Log in as Demo User</span>
        </div>

      </form>
      </div>


    </>
  );
}

export default LoginFormModal;

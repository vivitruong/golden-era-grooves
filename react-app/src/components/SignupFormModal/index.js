import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
function SignupFormModal() {
const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState('')
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			      <div class="title-bar loginmodal">
					<div class="title-bar-text">Sign Up</div>
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
         <div className='login-username login-info'>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
		  <div className='login-username login-info'>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          </div>
		  <div className='login-username login-info'>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
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
		  <div className='login-passwordconfirm login-info'>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required

          />
          </div>
        </div>
        <div className="down-login">
        <button type="submit">Sign Up</button>
		<span>Already have an account? Login instead</span>
        </div>

      </form>
      </div>
		</>
	);
}

export default SignupFormModal;

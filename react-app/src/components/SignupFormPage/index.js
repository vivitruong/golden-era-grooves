import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";


function SignupFormPage() {
  const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState('')
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );


	const handleSubmit = async (e) => {
    e.preventDefault();

    // Define an array to store validation error messages
    const validationErrors = [];

    // Check if the first name field is empty
    if (!firstName) {
      validationErrors.push("First name is required");
    }

    // Check if the last name field is empty
    if (!lastName) {
      validationErrors.push("Last name is required");
    }

    // Check if the username field is empty
    if (!username) {
      validationErrors.push("Username is required");
    }

    // Check if the email field is empty
    if (!email) {
      validationErrors.push("Email is required");
    }

    // Check if the password field is empty
    if (!password) {
      validationErrors.push("Password is required");
    }

    // Check if the confirmPassword field is empty
    if (!confirmPassword) {
      validationErrors.push("Confirm Password is required");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      validationErrors.push("Confirm Password must match Password");
    }

    // If there are validation errors, set them and do not proceed with submission
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If all validations pass, dispatch the signUp action
    const data = await dispatch(signUp(firstName, lastName, username, email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  // const changeSignIn = () => {
  //   // Set redirectToLogin to true when the user clicks the link
  //   setRedirectToLogin(true);
  // };

  // // Use the Redirect component to navigate to the login page
  // if (redirectToLogin) {
  //   return <Redirect to="/login" />;
  // }
	return (
		<>
    <div class='centered-container'>
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
      {errors.length > 0 && (
          <div className="validation-errors">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

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
        <div>
      {/* Use the Link component to navigate to the login page */}
      <Link to="/login">Already have an account? Login instead</Link>
    </div>

        </div>

      </form>
      </div>
      </div>
      </>
  );
}

export default SignupFormPage;

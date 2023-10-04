import React, { useState, useEffect } from "react";
import "./Login.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Login = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("example@ok.com");
  const [password, setpassword] = useState("123456789");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log("login :", data);
    if (data) {
      setErrors(data);
    } else {
      // closeModal();
      console.log("login sucess");
    }
  };

  // useEffect(() => {
  //   console.log("email:", email);
  //   console.log("password:", password);
  // }, [email, password]);

  if (sessionUser) return <Redirect to="/" />;

  return (
    <div className={`login-container ${isMaximized ? "maximized" : ""}`}>
      <div className="login-box">
        <div className="login-title-bar">
          <div className="logo">
            <img src="xpLogo.png" alt="Windows Logo" />
          </div>
          <div className="login-title">Golden Era Grooves</div>
          <div className="window-controls">
            <button className="minimize-button">_</button>
            <button className="maximize-button" onClick={toggleMaximize}>
              {isMaximized ? "◻" : "□"}
            </button>
            <button className="close-button">X</button>
          </div>
        </div>
        <div className="login-content">
          <div className="welcome-message">
            Golden Era Grooves
            <br />
            Please log in
          </div>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="input-group">
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button
              // onClick={() => handleLogin()}
              className="login-button"
            >
              Log In
            </button>
          </form>
          <button className="signup-button">
            {/* Sign Up */}
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

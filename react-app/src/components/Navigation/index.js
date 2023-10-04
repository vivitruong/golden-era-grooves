import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { Redirect } from "react-router-dom";
import { Home } from "../../pages/home";

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <ul>
      <li>
        {/* <NavLink exact to="/login"> */}
        <Home />
        {/* </NavLink> */}
      </li>
      {/* {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )} */}
    </ul>
  );
}

export default Navigation;

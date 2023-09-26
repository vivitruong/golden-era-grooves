import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './components/stylesheet/app.css';
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";
import "98.css";
import Home from "./components/Right/Home";
import Player from './components/Right/Player'
import Winamp from "./components/Right/Player";
import Left from "./components/Left";
import PlaylistPage from "./components/Right/PlaylistPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {/* <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <>
          <div className="app-right-container">
            <>
            <NavBar />
            </>

          </div>
          </>
        </Route>
      </Switch>
    </BrowserRouter> */}
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
          <Home />
          <Left />
          {/* <Winamp /> */}

          {/* <Player /> */}
          </Route>
          <Route path='/playlists/:playlistId'>
          <PlaylistPage/>

          </Route>
        </Switch>


      )}
    </>
  );
}

export default App;

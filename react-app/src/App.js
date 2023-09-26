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
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./components/NotFound";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
 <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
                <Left/>
              </div>
              <div className='app-right-container'>
                  <>
                    {/* <NavBar /> */}
                    <Navigation />
                    <Home/>
                  </>
              </div>

            </div>
          </>
        </Route>
        <ProtectedRoute path='/upload'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
              <Left/>
              </div>
              <div className='app-right-container'>
                  <>
                    <NavBar />
                    {/* <UploadSong/> */}
                </>
              </div>

            </div>
            </>
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:playlistId'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
               <Left/>
              </div>
              <div className='app-right-container'>
                <>
                  <NavBar />
                  <PlaylistPage/>
                </>
              </div>

            </div>
          </>
        </ProtectedRoute>
        <ProtectedRoute path='/profile'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
              <Left/>
              </div>
              <div className='app-right-container'>
                <>
                <NavBar />
                {/* <UserPage /> */}
                </>
              </div>

            </div>
          </>
        </ProtectedRoute>
        <Route>
          <>
            <div className='main-app'>
            <div className='app-left-container'>
               <Left/>
            </div>
            <div className='app-right-container'>
                <>
                  <NavBar />
                  <NotFound/>
                </>
                {/* <Footer/> */}
              </div>
            </div>
          </>
        </Route>
      </Switch>
    </BrowserRouter>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/'>
          <Home />
          <Left />
          <Winamp /> */}

          {/* <Player /> */}
          {/* </Route>
          <Route path='/playlists/:playlistId'>
          <PlaylistPage/>

          </Route>
        </Switch>


      )} */}
    </>
  );
}

export default App;

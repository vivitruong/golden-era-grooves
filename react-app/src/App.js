import React, { useState, useEffect , useRef} from "react";
import { useDispatch , useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import './app.css';
import '98.css';
import { Login } from "./pages/login";
import SplashScreen from "./components/SplashScreen";
import Button from "./components/Button";
import { fetchLocalData } from "./slices/playlistsSlice";
import Navbar from "./components/NavBar";
import CurrentPlayingSong from "./components/CurrentPlayingSong";
import volumnIcon from './assets/volumnIcon.svg';
import Controls from './components/Controls';
import HomePage from "./pages/HomePage";
import LikedSongsPage from "./pages/LikedSongsPage";
import SearchPage from "./pages/SearchPage";
import LibrarayPage from "./pages/LibrarayPage";
import CreatePlayList from "./pages/CreatePlayList";
import PlaylistsPage from "./pages/PlaylistsPage";
import SelectedPlaylistPage from "./pages/SelectedPlaylistPage";
import PlayLists from "./components/PlayLists";
import { pauseAudio, playAudio } from "./slices/songsSlice";

function App () {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(true);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [ dispatch ]);
  const { status, error } = useSelector((state) => state.playlists);
  const { playSong, isPlaying } = useSelector((state) => state.playSong);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const togglePlayPause = () => {
    if (isPlaying) {
      console.log("pause");
      dispatch(pauseAudio());
      audioRef.current.pause();
    } else {
      console.log("play");
      dispatch(playAudio(playSong?.filePath));
      audioRef.current.play();
    }
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocalData());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleVolumeChange = (e) => {
    const newVolume = e?.target?.value;
    if (newVolume && audioRef.current) {
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    } else {
      return;
    }
  };


  return (
    <>
     {/* <div className="app">
      <div className="container">
        <div>
          <Navbar />
          <PlayLists />
        </div>
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/liked-songs">
            <LikedSongsPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/library">
            <LibrarayPage />
          </Route>
          <Route path="/create-playlist">
            <CreatePlayList />
          </Route>
          <Route path="/playlists">
            <PlaylistsPage />
          </Route>
          <Route path="/playlist/:name">
            <SelectedPlaylistPage />
          </Route>
        </Switch>
      </div>
      <div className="bottom_control_board">
        <CurrentPlayingSong />
        <div className="grid_item1">
          <Controls
            isPlaying={isPlaying}
            playSong={playSong}
            audioRef={audioRef}
            togglePlayPause={togglePlayPause}
            volume={volume}
          />
        </div>
        <div className="volumn">
          <Button iconOnly>
            <img src={volumnIcon} alt="" />
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div> */}

<Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            {/* <LoginFormPage /> */}
            <Login />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;

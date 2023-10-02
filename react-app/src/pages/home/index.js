import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import { fetchLocalData } from "../../slices/playlistsSlice";
import PlayLists from "../../components/PlayLists";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import CurrentPlayingSong from "../../components/CurrentPlayingSong";
import { pauseAudio, playAudio } from "../../slices/songsSlice";
import volumnIcon from "../../assets/volumnIcon.svg";
import Controls from "../../components/Controls";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom";

import HomePage from "../HomePage"; // Import your route components
import LikedSongsPage from "../LikedSongsPage"; // Import your route components
import SearchPage from "../SearchPage"; // Import your route components
import LibrarayPage from "../LibrarayPage"; // Import your route components
import CreatePlayList from "../CreatePlayList"; // Import your route components
import PlaylistsPage from "../PlaylistsPage"; // Import your route components
import SelectedPlaylistPage from "../SelectedPlaylistPage";

export const Home = () => {
  const { allSongs } = useSelector((state) => state?.songs);
  const { selectedPlayListSongs } = useSelector((state) => state?.playlists);
  // const { id } = useParams();
  // const location = useLocation();
  // const isPlaylistPage = location.pathname.startsWith("/playlist/");
  // console.log(isPlaylistPage);

  // const selectedSongsList = isPlaylistPage
  //   ? selectedPlayListSongs?.playlist_songs?.map((song) => song.song)
  //   : allSongs;
  // console.log(selectedSongsList);

  const dispatch = useDispatch();
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
    <div className="app">
      <div className="container">
        <div>
          <Navbar />
          <PlayLists />
        </div>
        <Switch>
          {/* Route definitions for your pages */}
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
    </div>
  );
};

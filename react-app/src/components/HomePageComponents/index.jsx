import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Button from "../Button";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import Overlay from "../Overlay";
import CreateSong from "../CreateSong";
import {
  currentPlayListSongs,
  playAudio,
  playSong,
} from "../../store/slices/playlistSlice";
// import { playAudio, playSong } from "../../store/slices/playlistSlice";


const HomePageComponents = ({ allPlaylists }) => {


  const allSongs = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  const renderPlayList = allPlaylists?.map((playlist) => {
    return (
      <Link
        to={`/playlist/${playlist.name}`}
        // onClick={() => dispatch(selectedPlayListSongs(playlist))}
        key={playlist.id}
      >
        <div className="playlist">{playlist.name}</div>
      </Link>
    );
  });





  const renderAllSong = allSongs?.map((song, index) => {
    return (
      <div
        className={`song-row songs`}
        key={song?.id}
        onClick={() => {
          dispatch(currentPlayListSongs({ songs: allSongs }));
          dispatch(playSong({ song: song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="conn">
      </div>
      <div className="conn">
        <div className="create">
          <h4>Browse All New Music Today <img src="https://win98icons.alexmeub.com/icons/png/netshow-1.png"></img></h4>

        </div>
        <div className="allsongs">{renderAllSong}</div>
      </div>
    </div>
  );
};

export default HomePageComponents;

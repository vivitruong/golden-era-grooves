// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../slices/songsSlice";
import "./style.css";

const PlayLists = () => {
  const dispatch = useDispatch();

  const { playlists } = useSelector((state) => state.playlists);
  // const navigate = useNavigate();

  const handlePlaylistClick = (playlistName) => {
    dispatch(getSongs({ playlists, playlistName }));
    // navigate("/playlists");
  };

  const renderList = playlists?.map((playlist, index) => {
    return (
      <div
        key={index}
        // className={`playListName ${isActive ? "active" : ""}`}
        className={`playListName `}
        onClick={() => handlePlaylistClick(playlist.name)}
      >
        {playlist.name}
      </div>
    );
  });
  return (
    <div className="playList">
      <h2>My Playlists</h2>
      {/* {renderList} */}
    </div>
  );
};

export default PlayLists;

import { Link } from "react-router-dom";
// import { selectedPlayListSongs } from "../../slices/playlistsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Button from "../Button";
// import {
//   getAllSongs,
//   getSongs,
//   playAudio,
//   playSong,
// } from "../../slices/songsSlice";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import Overlay from "../Overlay";
import CreateSong from "../CreateSong";
import {
  currentPlayListSongs,
  playAudio,
  playSong,
} from "../../store/slices/playlistSlice";
// import { useDeleteSongMutation } from "../../slices/songsApiSlice";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import Divider from '../../components/Divider'
const HomePageComponents = ({ allPlaylists }) => {

  const allSongs = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  useEffect(() => {

  }, []);
  const dateString = "June.15.1998";
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
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
        <span style={{marginLeft: '200px'}} className=" duration-column">Gegrooves</span>
        <span style={{marginLeft: '500px'}} className=" duration-column">{formattedDate}</span>
        <span style={{marginLeft: '250px'}} className=" duration-column">3.30</span>

      </div>
    );
  });

  return (
    <div>

      <div className="conn">
        {/* <h2>PlayLists</h2>
        <div className="pList">{renderPlayList}</div> */}
      </div>
      <div className="conn">

        <div className="create">
        <h3>Browse All New Music Today With Golden Era Grooves <img src="https://win98icons.alexmeub.com/icons/png/netshow-1.png"></img></h3>
          {/* <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button> */}
        </div>
        <Divider />
        <div className="song-row header-row">
          <span className="song-column id-column">#</span>
          <span className="song-column title-column">Title</span>
          <span className="song-column album-column">Album</span>
          <span style={{ marginRight: '100px', textAlign: 'center' }} className="song-column date-added-column">Date Added</span>
          <span style={{ marginLeft: '0px', textAlign: 'center' }} className="song-column duration-column">Duration</span>
        </div>
        <div className="allsongs">{renderAllSong}</div>
      </div>
    </div>
  );
};

export default HomePageComponents;

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
  // const [showModal, setShowModal] = useState(false);
  // const [showDeleteModal, setDeleteModal] = useState(false);
  // const [showEditModal, setEditModal] = useState(false);
  // const [songToEditOrDelete, setSongToEditOrDelete] = useState(null);

  // const [artist, setArtist] = useState("");
  // const [coverPhoto, setCoverPhoto] = useState("");
  // const [filePath, setFilePath] = useState("");
  // const [genre, setGenre] = useState("");
  // const [name, setName] = useState("");

  const allSongs = useSelector((state) => state.songs);
  // const [deleteSong] = useDeleteSongMutation();
  // const [createUserSong] = useCreateSongMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(selectedPlayListSongs([]));
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

  // const deleteSongHandler = async (song) => {
  //   // const res = await deleteSong({ songId: song?.id });
  //   // dispatch();
  //   // removeSongToSelectedPlayList({ playlist, removeSong: song })
  // };

  // const createOrEditSong = async () => {
  //   const songToCreateOrEdit = {
  //     name,
  //     artist,
  //     coverPhoto,
  //     filePath,
  //     genre,
  //   };
  //   setShowModal(false);
  //   setEditModal(false);
  //   try {
  //     // const res = await createUserSong({
  //     //   song: JSON.stringify(songToCreateOrEdit),
  //     // }).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const reset = () => {
  //   setArtist("");
  //   setCoverPhoto("");
  //   setFilePath("");
  //   setGenre("");
  //   setName("");
  // };

  // useEffect(() => {
  //   if (songToEditOrDelete) {
  //     setArtist(songToEditOrDelete.artist || "");
  //     setCoverPhoto(songToEditOrDelete.coverPhoto || "");
  //     setFilePath(songToEditOrDelete.filePath || "");
  //     setGenre(songToEditOrDelete.genre || "");
  //     setName(songToEditOrDelete.name || "");
  //   }
  // }, [songToEditOrDelete]);

  // useEffect(() => {
  //   dispatch(getSongs({ songs: allSongs }));
  // }, [dispatch, allSongs]);

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
        <span className=" duration-column">{song?.duration}</span>
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
        <h3>Browse All New Music Today <img src="https://win98icons.alexmeub.com/icons/png/netshow-1.png"></img></h3>
          {/* <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button> */}
        </div>
        <Divider />
        <div className="song-row header-row">
          <span className="song-column id-column">#</span>
          <span className="song-column title-column">Title</span>
          <span className="song-column album-column">Album</span>
          <span className="song-column date-added-column">Date Added</span>
          <span className="song-column duration-column">Duration</span>
        </div>
        <div className="allsongs">{renderAllSong}</div>
      </div>
    </div>
  );
};

export default HomePageComponents;

import { Link } from "react-router-dom";
import { selectedPlayListSongs } from "../../slices/playlistsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Button from "../Button";
import {
  getAllSongs,
  getSongs,
  playAudio,
  playSong,
} from "../../slices/songsSlice";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import Overlay from "../Overlay";
import CreateSong from "../CreateSong";
import { useDeleteSongMutation } from "../../slices/songsApiSlice";

const HomePageComponents = ({ allPlaylists }) => {
  const [showModal, setShowModal] = useState(false);
  const { allSongs } = useSelector((state) => state.songs);
  const [deleteSong] = useDeleteSongMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedPlayListSongs([]));
  }, []);

  const renderPlayList = allPlaylists?.map((playlist) => {
    return (
      <Link
        to={`/playlist/${playlist.name}`}
        onClick={() => dispatch(selectedPlayListSongs(playlist))}
        key={playlist.id}
      >
        <div className="playlist">{playlist.name}</div>
      </Link>
    );
  });

  // useEffect(() => {
  //   dispatch(getSongs({ songs: allSongs }));
  // }, [dispatch, allSongs]);

  const renderAllSong = allSongs?.map((song, index) => {
    return (
      <div
        className={`song-row songs`}
        key={song?.id}
        onClick={() => {
          dispatch(getSongs({ songs: allSongs }));
          dispatch(playSong({ song: song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
        <Button
          iconOnly
          onClick={async (e) => {
            e.stopPropagation();
            const res = await deleteSong({ songId: song?.id });
            console.log(res);
            // dispatch();
            // removeSongToSelectedPlayList({ playlist, removeSong: song })
          }}
        >
          Delete Song
        </Button>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="conn">
          <h2>PlayLists</h2>
          <div className="pList">{renderPlayList}</div>
        </div>
        <div className="conn">
          <div className="create">
            <h2>All Songs</h2>
            <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button>
          </div>
          <div className="allsongs">{renderAllSong}</div>
        </div>
      </div>
      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <CreateSong />
          </Modal>
        </>
      )}
    </>
  );
};

export default HomePageComponents;

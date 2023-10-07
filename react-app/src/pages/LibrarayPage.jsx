import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";
import CreateSong from "../components/CreateSong";
import { updateASong, deleteSong } from "../store/userSong";
import { playAudio, playSong, currentPlayListSongs } from "../store/slices/playlistSlice";
import EditSong from "../components/EditSong";
import ActionBar from '../components/ActionBar'
import Divider from '../components/Divider'
const LibrarayPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [songToEditOrDelete, setSongToEditOrDelete] = useState(null);
  const userSongs = useSelector((state) => state.userSongs);


  const dispatch = useDispatch();



  const deleteSongHandler = (song) => {
    dispatch(deleteSong({ songId: song?.id }));
    setShowModal(false);
    setEditModal(false);
  };


  const renderUserSongs = userSongs.map((song, index) => (
    <div
      className={`song-row songs`}
      key={song?.id}
      onClick={() => {
        dispatch(currentPlayListSongs({ songs: userSongs}));
        dispatch(playSong({song: song, index}));
        dispatch(playAudio())
      }}
    >
      <span className="song-column id-column">{index + 1}</span>
      <div className="song-column title">
        <span className=" title-column">{song?.name}</span>
        <span className=" artist-column">{song?.artist}</span>
      </div>
      <Button
        iconOnly
        onClick={(e) => {
          e.stopPropagation();
          setDeleteModal(true);
          setSongToEditOrDelete(song);
        }}
      >
        Delete Song
      </Button>
      <Button
        iconOnly
        onClick={(e) => {
          e.stopPropagation();
          setEditModal(true);
          setSongToEditOrDelete(song);
        }}
      >
        Edit Song
      </Button>
    </div>
  ));
  return (
    <>

      <div className="conn">
        <div className="conn">
          <Divider />
          <div className="create">
            <h4>You are an amazing artist! Get started by uploading your songs/tracks here🎵 😁 </h4>
            <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button>
          </div>
          <Divider />
        </div>
        {renderUserSongs}
      </div>
      {showEditModal && (
        <>
          <Overlay
            onClose={() => {
              setSongToEditOrDelete(null);
              setEditModal(false);

            }}
          />
          <Modal>
            <EditSong song_id={songToEditOrDelete?.id}
            setEditModal={setEditModal}

            />
          </Modal>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">
          <div class="title-bar inactive">
  <div class="title-bar-text">Delete</div>
  <div class="title-bar-controls">

  </div>
</div>
            <h4>
              Are You Sure you want to delete "{songToEditOrDelete?.name}" song? <img src='https://win98icons.alexmeub.com/icons/png/msg_error-2.png'></img>
            </h4>
            <div className="btns">
              <Button
                iconOnly
                onClick={() => {
                  deleteSongHandler(songToEditOrDelete);
                  setDeleteModal(false)
                }
              }

              >
                Delete
              </Button>
              <Button
                iconOnly
                onClick={() => {
                  setDeleteModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <CreateSong
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default LibrarayPage;

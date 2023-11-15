import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";
import CreateSong from "../components/CreateSong";
import { deleteSong } from "../store/userSong";
import { playAudio, playSong, currentPlayListSongs } from "../store/slices/playlistSlice";
import EditSong from "../components/EditSong";
import Divider from '../components/Divider';
import { fetchAllSongs } from "../store/song";

const LibrarayPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [songToEditOrDelete, setSongToEditOrDelete] = useState(null);

  const userSongs = useSelector((state) => state.userSongs);

  const dispatch = useDispatch();

  const deleteSongHandler = async (song) => {
    const response = await dispatch(deleteSong({ songId: song?.id }));
    if (response){
      const allSongs = fetchAllSongs();
      dispatch(allSongs)
      setShowModal(false);
      setEditModal(false);
    }

  };


  const renderUserSongs = userSongs.map((song, index) => (
    <div
      className={`song-row songs`}
      key={index}
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
              Upload Song
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
            <EditSong song={songToEditOrDelete}
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
              Are you sure you want to delete "{songToEditOrDelete?.name}"?<img src='https://win98icons.alexmeub.com/icons/png/msg_error-2.png'></img>
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

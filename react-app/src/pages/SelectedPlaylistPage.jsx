import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { playSong, playAudio, getSongs } from "../slices/songsSlice";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Overlay from "../components/Overlay";
import SongsModal from "../components/SongsModel";
// import { removeSongToSelectedPlayList } from "../slices/playlistsSlice";
import PlayListForm from "../components/PlayListForm";

const SelectedPlaylistPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);

  const { selectedPlayListSongs: playlist } = useSelector(
    (state) => state.playlists
  );
  const [name, setName] = useState(playlist?.name);
  const [description, setDescription] = useState(playlist?.description);
  const submitHandler = (e) => {
    e.preventDefault();
    const playListToBeEdited = {
      name,
      description,
    };

    setDescription("");
    setName("");
  };

  const [showDeleteModal, setDeleteModal] = useState(false);
  // const [addedSongs, setAddedSongs] = useState(playlist?.playlist_songs);
  const { allSongs: songs } = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  // if (playlist?.playlist_songs?.length === 0) {
  //   return (
  //     <div className="add_songs">
  //       <h2>NO SONGS</h2>
  //       <Button iconOnly onClick={() => setAddedSongs(true)}>
  //         ADD SONGS
  //       </Button>
  //     </div>
  //   );
  // }

  const deleteHandler = () => {
    setDeleteModal(false);
  };

  const renderList = playlist?.playlist_songs?.map((song, index) => {
    // const active = currentSongIndex === index;
    return (
      <div
        className={`song-row songs `}
        key={song?.id}
        onClick={() => {
          dispatch();
          // getSongs({
          //   songs: playlist?.playlist_songs?.map((song) => song.song),
          // })
          // dispatch(playSong({ song: song?.song, index }));
          // dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.song?.name}</span>
          <span className=" artist-column">{song?.song?.artist}</span>
        </div>
        <Button
          iconOnly
          onClick={(e) => {
            e.stopPropagation();
            dispatch();
            // removeSongToSelectedPlayList({ playlist, removeSong: song })
          }}
        >
          Remove
        </Button>
      </div>
    );
  });

  return playlist?.playlist_songs?.length === 0 ? (
    <>
      <div className="add_songs">
        <h2>NO SONGS</h2>
        <div style={{ display: "flex", gap: "6px" }}>
          <Button iconOnly onClick={() => setShowModal(true)}>
            ADD SONGS
          </Button>
          <Button iconOnly onClick={() => setDeleteModal(true)}>
            Delete Playlist
          </Button>
          <Button iconOnly onClick={() => setEditModal(true)}>
            Edit Playlist
          </Button>
        </div>
      </div>
      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <SongsModal
              songs={songs}
              playlist={playlist}
              // addedSongs={addedSongs}
              // setAddedSongs={setAddedSongs}
            />
          </Modal>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">
            <h2>Are You Sure you want to delete? {playlist?.name} playlist</h2>
            <div className="btns">
              <Button iconOnly onClick={deleteHandler}>
                Delete
              </Button>
              <Button iconOnly onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <>
          <Overlay onClose={() => setEditModal(false)} />
          <Modal>
            <PlayListForm
              submitHandler={submitHandler}
              name={name}
              description={description}
              setName={setName}
              setDescription={setDescription}
              btnText={"Create PlayList"}
            />
          </Modal>
        </>
      )}
    </>
  ) : (
    <>
      <div className="containers">
        <div className="play_list_addsongs">
          <div>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button iconOnly onClick={() => setShowModal(true)}>
              Add Songs
            </Button>
            <Button iconOnly onClick={() => setDeleteModal(true)}>
              Delete Playlist
            </Button>
            <Button iconOnly onClick={() => setEditModal(true)}>
              Edit Playlist
            </Button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className="song-row header-row">
            <span className="song-column id-column">#</span>
            <span className="song-column title-column">Title</span>
          </div>
          <div className="table">{renderList}</div>
        </div>
      </div>
      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <SongsModal
              songs={songs}
              playlist={playlist}
              // addedSongs={addedSongs}
              // setAddedSongs={setAddedSongs}
            />
          </Modal>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">
            <h2>Are You Sure you want to delete? {playlist?.name} playlist</h2>
            <div className="btns">
              <Button iconOnly onClick={deleteHandler}>
                Delete
              </Button>
              <Button iconOnly onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <>
          <Overlay onClose={() => setEditModal(false)} />
          <Modal>
            <PlayListForm
              submitHandler={submitHandler}
              name={name}
              description={description}
              setName={setName}
              setDescription={setDescription}
              btnText={"Edit PlayList"}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default SelectedPlaylistPage;

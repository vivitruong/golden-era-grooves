import { Link } from "react-router-dom";
import icon from "../../assets/file_icon_bl.svg";
import iconUser from "../../assets/user_computer.svg";
import Button from "../Button";
import { useState, useEffect } from "react";
import Overlay from "../Overlay";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { deletePlaylist } from "../../store/playlist";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import PlayListForm from "../PlayListForm";
import { updatePlaylist } from "../../store/playlist";
import Modal from "../Modal";
import SongsModal from "../SongsModel";

const PlayListHeader = ({ playlistName = "My Heart Will Go On" }) => {
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addSongModal, setAddSongModal] = useState(false);
  const [currentPlayList, setCurrentPlaylist] = useState({});
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.userPlaylists);
  const songs = useSelector((state) => state.songs);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const deleteHandler = () => {
    dispatch(deletePlaylist(id));
    setDeleteModal(false);
    history.push("/");
  };

  useEffect(() => {
    const list = playlists.filter((pl) => parseInt(pl?.id) === parseInt(id));
    setCurrentPlaylist(...list);
  }, [playlists, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const playListToBeEdited = {
      name,
      description,
      playlistId: id,
    };
    console.log("id is " + id);

    dispatch(updatePlaylist(playListToBeEdited));
    // dispatch(createNewPLaylist(playListToBeEdited));

    setDescription("");
    setShowEditModal(false);
    setDeleteModal(false);
    setName("");
  };

  return (
    <>
      <div className="container_playListHeader">
        <div className="playListHeader">
          <div className="icon">
            <img src={icon} alt="" />
          </div>
          <div>
            <p>Playlist</p>
            <h2>{currentPlayList?.name}</h2>
            {/* <p>{`${currentPlayList?.playlist_songs?.length} songs`}</p> */}
          </div>
        </div>
        <div className="btns">
          <Button iconOnly onClick={() => setDeleteModal(true)}>
            Delete PlayList
          </Button>
          <Button iconOnly onClick={() => setShowEditModal(true)}>
            Edit PlayList
          </Button>
          <Button iconOnly onClick={() => setAddSongModal(true)}>
            Add Songs
          </Button>
        </div>
      </div>
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">

            <h4>Are You Sure you want to delete this playlist?</h4>
            <div className="btns">


              <Button iconOnly onClick={() => deleteHandler()}>
                Delete
              </Button>
              <Button
                iconOnly
                onClick={() => {
                  setDeleteModal(false);
                  // reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <div className="deleteModal">
          <Overlay onClose={() => setShowEditModal(false)} />
          <>
            EditPlayList
            <PlayListForm
              submitHandler={submitHandler}
              name={name}
              description={description}
              setName={setName}
              setDescription={setDescription}
              btnText={"Edit PlayList"}
            />
          </>
        </div>
      )}

      {addSongModal && (
        <>
          <Overlay onClose={() => setAddSongModal(false)} />
          <Modal>
            <SongsModal
              songs={songs}
              playlistId={id}
              // addedSongs={addedSongs}
              // setAddedSongs={setAddedSongs}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default PlayListHeader;

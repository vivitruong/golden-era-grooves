import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playSong, playAudio, getSongs } from "../slices/songsSlice";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Overlay from "../components/Overlay";
import SongsModal from "../components/SongsModel";
import { removeSongToSelectedPlayList } from "../slices/playlistsSlice";

const SelectedPlaylistPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedPlayListSongs: playlist } = useSelector(
    (state) => state.playlists
  );
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

  const renderList = playlist?.playlist_songs?.map((song, index) => {
    // const active = currentSongIndex === index;
    return (
      <div
        className={`song-row songs `}
        key={song?.id}
        onClick={() => {
          dispatch(
            getSongs({
              songs: playlist?.playlist_songs?.map((song) => song.song),
            })
          );
          dispatch(playSong({ song: song?.song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.song?.name}</span>
          <span className=" artist-column">{song?.song?.artist}</span>
        </div>
        <Button
          iconOnly
          onClick={() => {
            dispatch(
              removeSongToSelectedPlayList({ playlist, removeSong: song })
            );
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
        <Button iconOnly onClick={() => setShowModal(true)}>
          ADD SONGS
        </Button>
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
    </>
  ) : (
    <>
      <div className="containers">
        <div className="play_list_addsongs">
          <div>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
          </div>
          <Button iconOnly onClick={() => setShowModal(true)}>
            Add Songs
          </Button>
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
    </>
  );
};

export default SelectedPlaylistPage;

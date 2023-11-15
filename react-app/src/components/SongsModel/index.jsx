
import { useDispatch } from "react-redux";
import Button from "../Button";
import { addSongsToPlaylist } from "../../store/playlist";

const SongsModal = ({ songs, playlistId, songsInPlayList }) => {
  const dispatch = useDispatch();

  const renderList = songs?.map((song, index) => {


    return (

      <div
        className={`song-row songs `}
        key={song?.id}
        onClick={() => {

        }}
      >
        <span className="song-column id-column">{song?.id}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>

        <Button
          iconOnly
          onClick={() => {
            const addSong = {
              id: Math.random(),
              song,
              playlistId,
              songId: song?.id,
            };
            dispatch(
              addSongsToPlaylist({ playlistId, song_Id: song?.id, addSong })
            );
          }}
        >
          Add
        </Button>
      </div>

    );
  });
  return (
<>
    <div class="title-bar inactive">
  <div class="title-bar-text">Add any song into your playlist</div>
  <div class="title-bar-controls">

  </div>
</div>
    <div>
      <div>{renderList}</div>
    </div>
    </>
  );
};

export default SongsModal;

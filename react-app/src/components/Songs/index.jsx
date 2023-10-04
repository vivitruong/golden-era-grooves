import { useDispatch } from "react-redux";
import { playSong, playAudio } from "../../slices/songsSlice";

import "./style.css";

const Songs = ({ songs }) => {
  // const { currentSongIndex } = useSelector((state) => state.playSong);
  const dispatch = useDispatch();

  const renderList = songs?.map((song, index) => {
    // const active = currentSongIndex === index;
    return (
      <div
        className={`song-row songs `}
        key={song?.id}
        onClick={() => {
          dispatch(playSong({ song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{song?.id}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.title}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
        <span className="song-column album-column">{song?.album}</span>
        <span className="song-column date-added-column">
          {song?.date_added}
        </span>
        <span className="song-column duration-column">{song?.duration}</span>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="song-row header-row">
          <span className="song-column id-column">#</span>
          <span className="song-column title-column">Title</span>
          <span className="song-column album-column">Album</span>
          <span className="song-column date-added-column">Date Added</span>
          <span className="song-column duration-column">Duration</span>
        </div>
        <div className="table">{renderList}</div>
      </div>
    </>
  );
};

export default Songs;

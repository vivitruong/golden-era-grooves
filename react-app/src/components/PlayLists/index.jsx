import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { currentPlayListSongs } from "../../store/slices/playlistSlice";
import { useHistory } from "react-router-dom";


const PlayLists = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const playlists = useSelector((state) => state.userPlaylists);
  const handlePlaylistClick = (playlist) => {

    dispatch(currentPlayListSongs({ songs: playlist?.playlist_songs }));
    history.push(`/playlists/${playlist.id}`);
  };

  const renderList = playlists?.map((playlist, index) => {
    return (
      <div
        key={index}
        className={`playListName `}
        onClick={() => handlePlaylistClick(playlist)}
      >
        {playlist?.name}
      </div>
    );
  });
  return (
<div className="playList">
  <span style={{ fontSize: '20px', paddingTop: '10px', fontWeight: '600' }}>
    My Playlists <img src='https://win98icons.alexmeub.com/icons/png/cd_audio_cd-1.png' alt="CD Icon" />
  </span>
  {renderList.map((item, index) => (
    <div key={index} style={{ padding: '5px 0' }}>

      {item}
    </div>
  ))}
</div>
  );
};

export default PlayLists;

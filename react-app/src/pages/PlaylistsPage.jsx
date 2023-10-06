import { useSelector } from "react-redux";
import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useState } from "react";

const PlaylistsPage = () => {
  const currentPlayLists = useSelector((state) => state.userPlaylists);
  const [playlist, setCurrentPlaylist] = useState([]);
  const { id } = useParams();
  return (
    <div style={{ width: "100%" }}>
      <PlayListHeader songsInPlayList={playlist?.playlist_songs} />
      <Divider />
      <ActionBar />
      <Divider />
      {playlist?.playlist_songs?.length === 0 ? (
        <h4>You don't have any songs in this playlist yet 😕</h4>
      ) : (
        <Songs songs={playlist?.playlist_songs} />
      )}
    </div>
  );
};

export default PlaylistsPage;

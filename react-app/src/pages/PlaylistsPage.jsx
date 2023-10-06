import { useSelector } from "react-redux";
import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";

const PlaylistsPage = () => {
  const { currentPlayListSongs } = useSelector((state) => state.playlistSongs);
  return (
    <div style={{ width: "100%" }}>
      <PlayListHeader />
      <Divider />
      <ActionBar />
      <Divider />
      {currentPlayListSongs?.length === 0 ? (
        <h4>You don't have any songs in this playlist yet 😕 </h4>
      ) : (
        <Songs songs={currentPlayListSongs} />
      )}
    </div>
  );
};

export default PlaylistsPage;

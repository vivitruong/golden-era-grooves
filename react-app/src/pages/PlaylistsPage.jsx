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
        <h2>No songs yet</h2>
      ) : (
        <Songs songs={currentPlayListSongs} />
      )}
    </div>
  );
};

export default PlaylistsPage;

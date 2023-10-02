import { useSelector } from "react-redux";
import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";

const PlaylistsPage = () => {
  const { songs } = useSelector((state) => state.songs);
  return (
    <div style={{ width: "100%" }}>
      <PlayListHeader />
      <Divider />
      <ActionBar />
      <Divider />
      {songs.length === 0 ? <h2>No songs yet</h2> : <Songs songs={songs} />}
    </div>
  );
};

export default PlaylistsPage;

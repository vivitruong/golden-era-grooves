import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { useSelector } from "react-redux";

const LikedSongsPage = () => {
  const { likedSong } = useSelector((state) => state.likedSongs);

  return (
    <div style={{ width: "100%" }}>
      <PlayListHeader />
      <Divider />
      <ActionBar />
      <Divider />
      {likedSong.length === 0 ? (
        <h2>No Liked Songs yet</h2>
      ) : (
        <Songs songs={likedSong} />
      )}
    </div>
  );
};

export default LikedSongsPage;

import ActionBar from "../components/ActionBar";
import SongsLike from "../components/SongsLike";
import Divider from "../components/Divider";
import { useDispatch, useSelector } from "react-redux";

const LikedSongsPage = () => {
  const songs = useSelector((state)=>state.songs)
  const userId = useSelector(state => state.session.user.id)
  const likedSongIds  = useSelector((state) => state?.likes[userId]) || [];

  const likedSongs = songs.filter(song=>likedSongIds.includes(song.id))

  return (
    <div style={{ width: "100%" }}>
      <Divider />
      <ActionBar />
      <Divider />
      {likedSongs.length === 0 ? (
        <h4>You don't have any liked songs yet 😁</h4>
      ) : (
        <SongsLike songs={likedSongs} />
      )}

    </div>
  );
};

export default LikedSongsPage;

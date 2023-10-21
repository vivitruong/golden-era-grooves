import ActionBar from '../ActionBar'

import Divider from "../Divider";


const CommentPage = () => {
  const { likedSong } = useSelector((state) => state.likedSongs);

  return (
    <div style={{ width: "100%" }}>
      <PlayListHeader />
      <Divider />
      <ActionBar />
      <Divider />
      <h4>Comment Feature Coming Soon! Please stay tune with us 🤗</h4>
      {likedSong.length === 0 ? null : <Songs songs={likedSong} />}

    </div>
  );
};

export default CommentPage;

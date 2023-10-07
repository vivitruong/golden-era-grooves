import ActionBar from '../ActionBar'

import Divider from "../Divider";


const CommentPage = () => {
  // const { likedSong } = useSelector((state) => state.likedSongs);

  return (
    <div style={{ width: "100%" }}>
      {/* <PlayListHeader /> */}
      <Divider />
      <ActionBar />
      <Divider />
      {/* {likedSong.length === 0 ? ( */}
      <h4>Comment Feature Coming Soon! Please stay tune with us 🤗</h4>
      {/* ) : ( */}
      {/* <Songs songs={likedSong} /> */}
      {/* )} */}
    </div>
  );
};

export default CommentPage;

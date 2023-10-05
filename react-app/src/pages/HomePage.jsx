import { useEffect } from "react";
import HomePageComponents from "../components/HomePageComponents";
// import { useGetAllPlaylistsQuery } from "../slices/playListApiSlice";
// import { useGetAllSongsQuery } from "../slices/songsApiSlice";
import { useDispatch } from "react-redux";
// import { getAllSongs } from "../slices/songsSlice";

const HomePage = () => {
  // const { data: allPlaylists } = useGetAllPlaylistsQuery();
  // const { data: allSongs } = useGetAllSongsQuery();
  const dispatch = useDispatch();

  // useEffect(() => {
  // if (allSongs) {
  // dispatch(getAllSongs(allSongs?.songs));
  // }
  // }, [allSongs, dispatch]);

  return (
    <div style={{ width: "100%" }}>
      <HomePageComponents
      // allPlaylists={allPlaylists?.playlists}
      />
    </div>
  );
};

export default HomePage;

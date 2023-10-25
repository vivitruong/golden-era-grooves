import { useEffect } from "react";
import HomePageComponents from "../components/HomePageComponents";

import { useDispatch } from "react-redux";
// import { getAllSongs } from "../slices/songsSlice";

const HomePage = () => {





  return (
    <div style={{ width: "100%" }}>
      <HomePageComponents
      // allPlaylists={allPlaylists?.playlists}
      />
    </div>
  );
};

export default HomePage;

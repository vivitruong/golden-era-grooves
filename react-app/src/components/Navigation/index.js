import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import {
  deletePlaylist,
  createNewPLaylist,
  addSongsToPlaylist,
  fetchUserList,
  updatePlaylist,
} from "../../store/playlist";
import "./Navigation.css";
import { createSong, fetchAllSongs } from "../../store/song";
import { deleteSong, fetchUserSongs, updateASong } from "../../store/userSong";
import { Home } from "../../pages/home";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
      const userPlaylists = fetchUserList();
      const userSongs = fetchUserSongs();
      const allSongs = fetchAllSongs();
      dispatch(userPlaylists);
      dispatch(userSongs);
      dispatch(allSongs);
    }

  }, [ dispatch, sessionUser ]);


  if (!sessionUser) return <Redirect to="/welcome" />;

  return (
    <main>
      <Home />
    </main>
  );

  // const updatedSong = {
  // 	artist: "Delete me plz dont",
  // 	coverPhoto: null,
  // 	filePath: null,
  // 	genre: "Instrumental dasdasdasd",
  // 	id: 17,
  // 	name: "ahahahah Delete me",
  // };

  // return (
  // 	<ul>
  // 		<li>
  // 			Home
  // 		</li>
  // 		<li onClick={async () => await dispatch(createNewPLaylist({ name: 'Superhero squad', description: "description is cool" }))}>
  // 			create playlist
  // 		</li>
  // 		<li onClick={async () => await dispatch(createSong({ name: 'name', artist_name: 'artist_name cool haha', genre: 'genre', cover_photo: 'cover_photo', file_path: 'file_path' }))}>
  // 			create song
  // 		</li>
  // 		<li onClick={async () => await dispatch(deletePlaylist(20))}>
  // 			delete pl
  // 		</li>
  // 		<li onClick={() => dispatch(addSongsToPlaylist({ playlistId: 19, songId: 15 }))}>
  // 			add song to play list
  // 		</li>
  // 		<li onClick={() => dispatch(updatePlaylist({ playlistId: 21, name: "A new name", description: "A new description" }))}>
  // 			edit playlist
  // 		</li>
  // 		<li onClick={() => dispatch(deleteSong({ songId: 18 }))}>
  // 			delete song
  // 		</li>
  // 		<li onClick={() => dispatch(updateASong(updatedSong))}>
  // 			update song
  // 		</li>
  // 		{isLoaded && (
  // 			<li>
  // 				<ProfileButton user={sessionUser} />
  // 			</li>
  // 		)}
  // 	</ul>
  // );
}

export default Navigation;

import { useState } from "react"; // Import useState
import { useDispatch } from "react-redux";

import Button from "../Button";
import { addSongsToPlaylist } from "../../store/playlist";

const SongsModal = ({ songs, playlistId, songsInPlayList }) => {
  console.log(playlistId);
  const dispatch = useDispatch();

  // Initialize state to keep track of added songs

  const renderList = songs?.map((song, index) => {
    // Check if the song is already added
    // const isSongAdded = addedSongs.includes(song.id);

    return (
      <div
        className={`song-row songs `}
        key={song?.id}
        onClick={() => {
          // dispatch(playSong({ song: song?.song, index }));
          // dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{song?.id}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
        <Button
          iconOnly
          onClick={() => {
            const addSong = {
              id: Math.random(),
              song,
              playlistId,
              songId: song?.id,
            };
            dispatch(addSongsToPlaylist({  playlistId, song_Id: song?.id, addSong  }));


          }}
        >

          Add
        </Button>
      </div>
    );
  });
  return (
    <>
    <div class="title-bar inactive">
  <div class="title-bar-text">Add any song into your playlist</div>
  <div class="title-bar-controls">

  </div>
</div>
    <div>

      {/* <h4>Add any song into your playlist</h4> */}
      <div>{renderList}</div>
    </div>
    </>
  );
};

export default SongsModal;

import { useState } from "react"; // Import useState
import { useDispatch } from "react-redux";
import { addSongToSelectedPlayList } from "../../slices/playlistsSlice";
import Button from "../Button";

const SongsModal = ({ songs, playlist }) => {
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
              playlistId: playlist?.id,
              song,
              songId: Math.random(),
            };
            dispatch(addSongToSelectedPlayList({ playlist, addSong }));

            // setAddedSongs([...addedSongs, song.id]);
          }}
        >
          {/* {isSongAdded ? "Added" : "Add"} */}
          Add
        </Button>
      </div>
    );
  });
  return (
    <div>
      <h2>Add Songs</h2>
      <div>{renderList}</div>
    </div>
  );
};

export default SongsModal;

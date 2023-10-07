import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/song';
import {updateASong} from '../../store/userSong';
import { useHistory, useParams } from "react-router-dom";
import './style.css'

const EditSong = ({song_id, setEditModal }) => {
  console.log(song_id)
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [songLoading, setSongLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setErrors] = useState({});
  const history = useHistory()
  const songId = song_id
  console.log(songId)
  const userSongs = useSelector((state) => state.userSongs);
  const user= useSelector((state) => state.session.user)
  console.log('this is song id Obj', userSongs)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = {};

  if(!name) errors.name = 'Song name is required';
  if(!genre) errors.genre = 'Genre is required';
  if(!artist) errors.artist = "artist is required"

  setErrors(errors);

  if (Object.keys(error).length === 0) {
    const formData = {
      name,
      genre,
      artist,
      user_id: user.id
    }


  try {

      await dispatch(updateASong(formData, songId));
      // history.push("/library");
      setEditModal(false)
  } catch (err){
      setErrors({});
      console.error("Error editing song:", err);
      setImageLoading(false);
      setSongLoading(false);
  }
}
  }
  return (
    <>
    <div class="title-bar">
  <div class="title-bar-text">Song</div>
  <div class="title-bar-controls">

  </div>
</div>
    <div className="page-container">
        <div className="form-create">
            <form
                onSubmit={handleSubmit}
                method='PUT'
                encType="multipart/form-data"

            >
                <div>
                <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
                <label> Title <span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Song Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Artist <span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>
                </div>
                <div>

                 <label >Genre <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <select style={{ margin: 'auto' }} value={genre} onChange={e => setGenre(e.target.value)} >
                            <option value="pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                            <option value='other'>Other</option>
                        </select>
                </div>
                <div className="align-create-button">
                <button className='create-button test' type="submit">Submit</button>
                </div>
            </form>
        </div>
        </div>
        </>
  );
};

export default EditSong;

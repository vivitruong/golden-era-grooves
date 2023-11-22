
import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import './style.css';
import { createSong } from "../../store/userSong";

const CreateSong = () => {
  const [artist, setArtist] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [file_path, setFilePath] = useState("");
  const [genre, setGenre] = useState("pop");
  const [name, setName] = useState("");
  const [songLoading, setSongLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setErrors] = useState({});
  const history = useHistory()



  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = {};

  if(!name) errors.name = 'Song name is required';
  if(!genre) errors.genre = 'Genre is required';
  if(!artist) errors.artist = "artist is required"

  if (cover_photo[0]  && cover_photo[0].name) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      let fileExtension = cover_photo[0].name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]


      if (!allowedExtensions.includes(fileExtension)) {
        errors.cover_photo = 'Image file must have a valid extension: .png, .jpg, .jpeg';
      }
    } else {
      errors.cover_photo = 'Image is required';
    }

    if (file_path  && file_path.name) {
      const allowedExtensions = ['mp3'];
      let fileExtension = file_path.name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]
      if (!allowedExtensions.includes(fileExtension)) {
        errors.file_path = 'Song file must have a valid extension: .mp3';
      }
    } else {
      errors.file_path = 'Song file is required';
    }
  setErrors(errors);

  if (Object.keys(error).length === 0) {


  const formData = new FormData();
  formData.append("name", name);
  formData.append("genre", genre);
  formData.append("cover_photo", cover_photo[0]);
  formData.append("file_path", file_path)
  formData.append('artist', artist)

  try {

      await dispatch(createSong(formData));
      history.push("/");
  } catch (err){
      setErrors({});
      console.error("Error creating song:", err);
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

                 <label style={{padding: '20px 10px 10px 12px'}} className="input-create">Genre <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <select className="" style={{ margin: 'auto'}} value={genre} onChange={e => setGenre(e.target.value)} >
                            <option value="pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                            <option value='other'>Other</option>
                        </select>
                </div>
                <div>
                <div className="error-message">{error.cover_photo && <p className="">{error.cover_photo}</p>}</div>
                {(imageLoading)&& <p>Image Uploading...</p>}
                <label className="label-create">

                    Select Cover Photo
                    <span style={{color:"red", fontSize:"1rem"}}>*</span>
                    <input
                        className="input-create"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {setCoverPhoto(e.target.files)

                        }}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{error.song_url && <p className="">{error.song_url}</p>}</div>
                {(songLoading)&& <p>Song Uploading...</p>}
                <label className="label-create">
                    Select Song
                    <span style={{color:"red", fontSize:"1rem"}}>*</span>
                    <input
                        className="input-create"
                        type="file"
                        accept="song/*"
                        onChange={(e) => setFilePath(e.target.files[0])}
                    />
                </label>
                </div>
                <div style={{padding:'10px'}} className="align-create-button">
                <button  className='create-button test' type="submit">UPLOAD</button>
                </div>
                <p>By uploading, you confirm that your file comply with our Terms of Use.</p>
            </form>
        </div>
        </div>
        </>
  );
};

export default CreateSong;

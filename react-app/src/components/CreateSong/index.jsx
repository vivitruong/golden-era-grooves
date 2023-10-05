// import { useState } from "react";
// import InputField from "../InputField";
// import Button from "../Button";
// // import { useCreateSongMutation } from "../../slices/songsApiSlice";
// // import { useDispatch } from "react-redux";

// const CreateSong = ({
//   artist,
//   coverPhoto,
//   filePath,
//   genre,
//   name,
//   setArtist,
//   setCoverPhoto,
//   setFilePath,
//   setGenre,
//   setName,
//   onSubmitHandler,
//   btnText,
// }) => {
//   // const [createUserSong] = useCreateSongMutation();

//   // const dispatch = useDispatch();

//   const submitHandler = async function (e) {
//     e.preventDefault();
//     onSubmitHandler();
//   };

//   return (
//     <form action="" onSubmit={submitHandler} className="form">
//       <InputField
//         name="artist"
//         value={artist}
//         onChange={(e) => setArtist(e.target.value)}
//         id="artist"
//         type="text"
//         placeholder="Artist"
//       />
//       <InputField
//         className="input"
//         required
//         name="coverPhoto"
//         value={coverPhoto}
//         onChange={(e) => setCoverPhoto(e.target.value)}
//         id="coverPhoto"
//         type="text"
//         placeholder="CoverPhoto"
//       />
//       <InputField
//         className="input"
//         required
//         name="filePath"
//         value={filePath}
//         onChange={(e) => setFilePath(e.target.value)}
//         id="filePath"
//         type="text"
//         placeholder="FilePath"
//       />
//       <InputField
//         className="input"
//         required
//         name="genre"
//         value={genre}
//         onChange={(e) => setGenre(e.target.value)}
//         id="genre"
//         type="text"
//         placeholder="Genre"
//       />
//       <InputField
//         className="input"
//         required
//         name="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         id="name"
//         type="text"
//         placeholder="Song Name"
//       />
//       <Button iconOnly>{btnText}</Button>
//     </form>
//   );
// };

// export default CreateSong;
import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch } from "react-redux";
import * as songActions from '../../store/song';
import { useHistory } from "react-router-dom";

const CreateSong = () => {
  const [artist, setArtist] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [file_path, setFilePath] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [songLoading, setSongLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setErrors] = useState({});
  const history = useHistory()



  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('-------------------------------' , cover_photo[0])
  const errors = {};

  if(!name) errors.name = 'Song name is required';
  if(!genre) errors.genre = 'Genre is required';
  if(!artist) errors.artist = "artist is required"

  if (cover_photo[0]  && cover_photo[0].name) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      let fileExtension = cover_photo[0].name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]
      console.log(fileExtension)

      if (!allowedExtensions.includes(fileExtension)) {
        errors.cover_photo = 'Image file must have a valid extension: .png, .jpg, .jpeg';
      }
    } else {
      errors.cover_photo = 'Image is required';
    }
    console.log(file_path)
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

  if (Object.keys(errors).length === 0) {
    const formData = {
      name,
      artist,
      cover_photo: cover_photo[0],
      file_path: file_path,
      genre,

    }

  // const formData = new FormData();
  // formData.append("song_name", name);
  // formData.append("genre", genre);
  // formData.append("cover_photo", cover_photo[0]);
  // formData.append("file_path", file_path[0])
  // formData.append('artist', artist)

  setImageLoading(true);
  setSongLoading(true);

  try {

      await dispatch(songActions.createSong(formData));
      history.push("/");
  } catch (err){
      setErrors({});
      console.error("Error creating song:", err);
      setImageLoading(false);
      setSongLoading(false);
  }
}
  }


  // const submitHandler = async function (e) {
  //   e.preventDefault();

  //   const songToCreate = {
  //     name,
  //     artist,
  //     coverPhoto,
  //     filePath,
  //     genre,
  //   };
  //   console.log(songToCreate);
  //   try {
  //     const res = await createUserSong({
  //       song: JSON.stringify(songToCreate),
  //     }).unwrap();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="page-container">
        <div className="form-create">
            {/* <h1>Create a New Song</h1> */}
            <form
                onSubmit={handleSubmit}

            >
                <div>
                <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
                <label className="label-create">
                    Your Song Name
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Song Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="label-create">
                    Artist
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
                <div className="error-message">{error.genre && <p className="">{error.genre}</p>}</div>
                <label className="label-create">
                    Song Genre
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{error.cover_photo && <p className="">{error.cover_photo}</p>}</div>
                {(imageLoading)&& <p>Image Uploading...</p>}
                <label className="label-create">
                    Select Cover Photo
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
                    <input
                        className="input-create"
                        type="file"
                        accept="song/*"
                        onChange={(e) => setFilePath(e.target.files[0])}
                    />
                </label>
                </div>
                <div className="align-create-button">
                <button className='create-button test' type="submit">UPLOAD</button>
                </div>
            </form>
        </div>
        </div>

  );
};

export default CreateSong;

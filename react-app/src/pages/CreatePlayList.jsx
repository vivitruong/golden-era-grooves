import { useState } from "react";
import PlayListForm from "../components/PlayListForm";
import { createNewPLaylist } from "../store/playlist";
import { useDispatch } from "react-redux";

const CreatePlayList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const playListToBeCreated = {
      name,
      description,
    };

    console.log(playListToBeCreated);
    dispatch(createNewPLaylist(playListToBeCreated));

    setDescription("");
    setName("");
  };

  return (
    <div>
      Hooray! Let's create a new playList
      <PlayListForm
        submitHandler={submitHandler}
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        btnText={"Create PlayList"}
      />
    </div>
  );
};

export default CreatePlayList;

import { useEffect } from "react";
import DeletePlaylistForm from "./DeletePlaylistForm";
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../../../../store/playlist'


const DeleteFormModal = ({ id }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(playlistActions.deletePlaylist(id))
          .then(() => {
            closeModal();
            history.push("/playlists");
          })
      };


    // const onClick = (e) => {
    //     e.stopPropagation();
    //     openModal(
    //         <DeletePlaylistForm playlist={playlist} onClose={() => closeModal()} />
    //     );
    //     closeDropdown();
    // };

    // useEffect(() => {
    //     document.addEventListener('click', e => {
    //         closeDropdown();
    //     });
    // }, [closeDropdown]);

    return (
        <button onClick={handleSubmit} className='deleteform-btn'style={{width:"100%", textAlign:"left"}}>
            <span className="deleteform-span">Delete</span>
        </button>
    );
}

export default DeleteFormModal;

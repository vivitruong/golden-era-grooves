import PlaylistForm from '../components/PlayLists/PlaylistForm';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal'
// import Playlist from '../components/PlayLists/Playlist'


const CreatePlayList = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  return (
    <>
    {user !== null &&  <div onClick={() => setShowModal(true)} className='app-left-make-playlistcomp'>

    <span style={{ cursor: 'pointer', color: 'black', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'black'}>Create Your New Playlist</span>

</div>

}
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <PlaylistForm onClose={() => setShowModal(false)}/>
        </Modal>
    )}
{/* <div className='app-left-playlistarea'>
   <Playlist/>
</div> */}
</>
  )
};

export default CreatePlayList;

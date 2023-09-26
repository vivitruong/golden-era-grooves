import PlaylistForm from "./Playlist/PlaylistForm";
import { Modal } from "../Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LabelledButton from '../LabelledButton'
import Playlist from "./Playlist/Playlist";
import Search from "./Search";
const Left = () => {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    return (
        <div className='app-left-main'>
            <Link className='app-left-logo' to='/'>
                <img src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/4.png' className='main-logo' alt='logo'/>
                <span style={{fontSize: '1.4rem'}}>GEGrooves</span>
            </Link>

            <Search/>
            <LabelledButton
                child={
                    <div className='app-letf-listen'>
                        <img src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/3.png' className='playmusic-logo' alt='logo' />
                        <span> Listen Now</span>
                    </div>
                }
            />
            <LabelledButton
                child={
                    <div className='app-left-radio'>
                        <img src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/1.png" className='radio-logo' alt='logo' />
                        <span>Radio</span>
                    </div>}
            />
            {user !== null &&  <div onClick={() => setShowModal(true)} className='app-left-make-playlistcomp'>
                <img src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/2.png" className='main-logo' alt='logo'/>
                <span>New Playlist</span>
            </div>

            }
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PlaylistForm onClose={() => setShowModal(false)}/>
                    </Modal>
                )}
            <div className='app-left-playlistarea'>
               <Playlist/>
            </div>
        </div>
    )
}

export default Left;

import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userSongsAction from '../../store/userSong'
import * as queueAction from '../../store/queue';
import './style.css'


const UserPage = () => {
    const songs = useSelector(state => state.userSongs.songs);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(userSongsAction.fetchUserSongs());
    }, [dispatch])

    const deleteSong = (i, song) => (e) => {
        e.stopPropagation();
        dispatch(queueAction.deleteSong(song.id));
        dispatch(userSongsAction.deleteSong(song.id));
    }

    const onSongClick = (song) => () => {
        dispatch(queueAction.updateList({ list: [song]}));
    };

    return (
        <>
        <h1>Hi</h1>
        <div className="userprofile-container">
            <div className="userprofile-info">
                {user &&
                    <div className="userprofile-info-main">
                        <div className="userprofile-info-img">
                            <img src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar9.png' alt='icon'/>
                        </div>
                        <div className="userprofile-info-content">
                            <div className="userprofile-info-content-profile" >
                                Profile
                            </div>
                            <div className="userprofile-info-content-name" style={{fontSize: "2rem"}}>
                                {user.firstName} {user.lastName}
                            </div>

                        </div>
                    </div>
                }
            </div>
            </div>
            <div className="userprofile-song">
                <span style={{fontSize:"1.5rem", margin:"10px"}}>Songs</span>
                <div className="userprofile-song-main">
                    { songs &&
                        <div className="userprofile-song-label userprofile-content">
                            <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                                Title
                            </span>
                            <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                                Artist
                            </span>
                            <span>

                            </span>
                        </div>
                    }
                    {
                        songs && Object.values(songs).map((song, i) => (
                            <div key={i} className="userprofile-song-content userprofile-content">
                                <span  onClick={onSongClick(song)} className="userprofile-song-name">
                                    {song.name}
                                </span>
                                <span>
                                    {song.artist}
                                </span>
                                <span onClick={deleteSong(i, song)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )

}

export default UserPage;

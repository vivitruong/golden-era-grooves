import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userSongsAction from '../../store/userSong'
import './style.css'

const UserPage = () => {
    const songs = useSelector(state => state.userSongs.songs);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(userSongsAction.fetchUserSongs());
    }, [dispatch])

    return (
        <div className="userprofile-container">
            <div className="userprofile-info">
                {user &&
                    <div className="userprofile-info-main">
                        <div className="userprofile-info-img">

                            <img style={{width: '50px'}} src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar11.png' alt='icon'/>
                        </div>
                        <div className="userprofile-info-content">
                            <div className="userprofile-info-content-profile" >

                            </div>
                            <div className="userprofile-info-content-name" style={{fontSize: "1rem"}}>
                                <span>Hello {user.firstName} {user.lastName}!</span>

                                <span>Thank you for browsing Golden Era Grooves</span>
                            </div>

                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default UserPage;

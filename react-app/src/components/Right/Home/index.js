import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistSong from './PlaylistSong';
import * as queueAction from '../../../store/queue';
import * as playlistAction from '../../../store/playlist';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs.songs);
    const playlists = useSelector(state => state.playlists.playlists);
    const [openings, setOpenings] = useState({});
    const {shuffled} = useSelector(state => state.queue);

    useEffect(() => {
        dispatch(songAction.fetchAllSongs());
        dispatch(playlistAction.fetchUserList());

    }, [dispatch]);

    const onSongClick = (song) => () => {
        dispatch(queueAction.updateList({ list: [song], shuffled}));
    };

    const addSongClick = (i) => () => {
        const newOpenings = {
            ...openings,
            [i]: !openings[i]
        };
        setOpenings(newOpenings);
    };

    return (
        <div className='home-main'>
            <div className='home-label'>
                <span style={{fontSize: "1.5rem", fontWeight: "500", margin: "2rem 2rem 2rem 2rem"}}>
                    New music
                </span>

                <div className="home-container">
                    <div className='home-song'>
                        {songs && Object.values(songs).map(
                            (song, i) => (
                                <div key={i} className="song-box" >
                                    <div className='song-box-img'>
                                        <img src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar1.png' style={{width: '50px', height: '50px'}} alt='icon'/>
                                            <div className='song-box-playbutton' onClick={onSongClick(song)}>
                                                <i className="fa-solid fa-play" style={{marginLeft: "0.1rem"}}></i>
                                            </div>
                                        {user !== null && playlists && Object.keys(playlists).length > 0 &&
                                            <div>
                                                <div className='song-box-addbutton' onClick={addSongClick(i)}>
                                                    <i className="fa-solid fa-ellipsis"></i>
                                                </div>
                                                {openings[i] &&
                                                    <PlaylistSong i={i} song={song} onClose={ ()=> setOpenings(true)} />
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='song-box-info'>
                                        <div className='song-box-info-title'>
                                            <span>{song.name}</span>
                                        </div>
                                        <div className='song-box-info-artist'>
                                            <span>
                                                {song.artist}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}


export default Home;

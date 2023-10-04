import { useState } from "react";
import { nextSong, pervSong } from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import iconShuffle from "../../assets/shuffle.svg";
import iconPlay from "../../assets/play.svg";
import iconPause from "../../assets/playIcon.svg";
import iconNext from "../../assets/next.svg";
import iconPrev from "../../assets/next.svg";
import iconRepeat from "../../assets/repeat.svg";
import "./styles.css";

const Controls = ({
  audioRef,
  togglePlayPause,
  playSong,
  isPlaying,
  volume,
}) => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.songs);
  // const { selectedPlayListSongs } = useSelector((state) => state.playlists);
  // const audioRef = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [loop, setLoop] = useState(false);

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    // Use padStart to ensure two digits for seconds and milliseconds
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  }

  // Update progress bar and skip to clicked position
  function updateProgress(e) {
    const audioElement = e.currentTarget;
    const { duration, currentTime } = audioElement;
    const progressPercent = (currentTime / duration) * 100;
    setProgressPercent(progressPercent);
    const remaining = duration - currentTime;
    setRemainingDuration(formatTime(remaining));
  }

  // Set progress bar and skip audio when clicked
  function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;

    const skipTime = (clickX / width) * duration;
    audioRef.current.currentTime = skipTime;

    // Update progress bar width as well
    const progressPercent = (skipTime / duration) * 100;
    setProgressPercent(progressPercent);
  }

  return (
    <>
      <div className="controls">
        <Button iconOnly onClick={() => {}}>
          <img src={iconShuffle} alt="" />
        </Button>
        <Button iconOnly onClick={() => dispatch(pervSong({ songs }))}>
          <img src={iconPrev} alt="" style={{ rotate: "180deg" }} />
        </Button>
        <Button
          iconOnly
          onClick={togglePlayPause}
          className={`${isPlaying ? "btnActive" : ""}`}
        >
          <img
            src={isPlaying ? iconPause : iconPlay}
            alt=""
            style={{ width: "10px" }}
          />
        </Button>
        <Button iconOnly onClick={() => dispatch(nextSong({ songs }))}>
          <img src={iconNext} alt="" />
        </Button>
        <Button
          iconOnly
          onClick={() => setLoop(!loop)}
          className={`${loop ? "btnActive" : ""}`}
        >
          <img src={iconRepeat} alt="" />
        </Button>
      </div>
      <div className="ctrl">
        {/* {playSong?.duration} */}
        <div
          className="progressContainer"
          id="progressContainer"
          onClick={setProgress}
        >
          <div
            className="progress"
            id="progress"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        {remainingDuration}
      </div>
      <div style={{ display: "none", pointerEvents: "none" }}>
        {playSong && (
          <div>
            <audio
              ref={audioRef}
              key={playSong?.filePath}
              controls
              autoPlay={isPlaying}
              onTimeUpdate={updateProgress}
              volume={volume}
              loop={loop}
            >
              <source src={playSong?.filePath} type="audio/mp3" />
            </audio>
          </div>
        )}
      </div>
    </>
  );
};

export default Controls;

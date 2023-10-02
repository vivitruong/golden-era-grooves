import { useState } from "react";
import { useSelector } from "react-redux";

const AudioPlayer = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  const { playSong, isPlaying } = useSelector((state) => state.playSong);

  const playAudio = () => {
    if (audioRef) {
      audioRef.play();
      // setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef) {
      audioRef.pause();
      // setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div>
      {playSong && (
        <div>
          <audio
            key={playSong?.src}
            controls
            ref={(audio) => setAudioRef(audio)}
            autoPlay={isPlaying}
            // onEnded={() => setIsPlaying(false)}
          >
            <source src={playSong?.src} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;

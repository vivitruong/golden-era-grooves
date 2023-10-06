import React from 'react';
import { MediaPlayer } from 'win95-media-player';

const CustomMediaPlayer = ({ playlistsong, className }) => {
  return (
    <MediaPlayer
      className={className}
      playlist={playlistsong}
      showVideo
      fullscreenEnabled
    />
  );
};

export default CustomMediaPlayer;

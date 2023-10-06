import React from 'react';
import ReactDOM from 'react-dom';
import CustomMediaPlayer from './CustomMediaPlayer'; // Make sure to adjust the import path

const playlistsong = [
  {
    url: 'https://archive.org/download/CC1301_windows_95/CC1301_windows_95_512kb.mp4',
    title: 'Computer Chronicles - Windows 95'
  }
];

ReactDOM.render(
  <CustomMediaPlayer playlist={playlistsong} className="player" />,
  document.getElementById('app')
);

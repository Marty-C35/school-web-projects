import React from 'react';
import './currentSong.css';
import heart from '../assets/heart.svg';

export interface CurrentSongProps {
    image: string,
    songName: string,
    artistName: string,
}

export const CurrentSong = ({ image, songName, artistName }: CurrentSongProps) => {
  const [buttonIcon, setButtonIcon] = React.useState('image');
  function handlePlay() {
    if (buttonIcon === 'image') {
      setButtonIcon('image--green');
    } else {
      setButtonIcon('image');
    }
  }

  return (
    <div className="song">
      <div className="image-wrapper">
        <img className="image" src={image} alt="Song" />
      </div>
      <div className="song__info">
        <p className="song__name">
          {songName}
        </p>
        <p className="song__artist">{artistName}</p>
      </div>
      <button className="button" type="button" onClick={handlePlay}>
        <img className={buttonIcon} alt="Like a song" src={heart} />
      </button>
    </div>
  );
};

export default CurrentSong;

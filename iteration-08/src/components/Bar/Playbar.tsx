import React from 'react';
import play from '../assets/play.svg';
import stop from '../assets/stop.svg';
import './playbar.css';

export const Playbar = () => {
  const [buttonText, setButtonText] = React.useState(true);
  function handleClick() {
    setButtonText(!buttonText);
  }

  const [buttonIcon, setButtonIcon] = React.useState(play);
  function handlePlay() {
    if (buttonIcon === play) {
      setButtonIcon(stop);
    } else {
      setButtonIcon(play);
    }
  }

  return (
    <div className="bar">
      <button className="bar__play" type="button" onClick={handlePlay}>
        <img alt="Play" className="image" src={buttonIcon} />
      </button>
      <button className="bar__follow" type="button" onClick={handleClick}>
        {buttonText ? 'Follow' : 'Unfollow'}
      </button>
    </div>
  );
};

export default Playbar;

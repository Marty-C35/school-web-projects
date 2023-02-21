import React from 'react';
import './card.css';
import play from '../assets/play.svg';
import stop from '../assets/stop.svg';

export interface CardProps {
    image: string,
    name: string,
    description: string,
}

export const Card = ({ image, name, description }: CardProps) => {
  const [buttonIcon, setButtonIcon] = React.useState(play);
  function handlePlay() {
    if (buttonIcon === play) {
      setButtonIcon(stop);
    } else {
      setButtonIcon(play);
    }
  }

  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img alt="" className="image image--rounded" src={image} />
        <button className="card__play" type="button" onClick={handlePlay} style={buttonIcon === stop ? { display: 'block' } : {}}>
          <img alt="Stop" className="image image--play" src={buttonIcon} />
        </button>
      </div>
      <div className="card__name">
        {name}
      </div>
      <div className="card__description">
        {description}
      </div>
    </div>
  );
};

export default Card;

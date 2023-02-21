import React from 'react';
import './artist.css';
import back from '../assets/back.svg';
import forward from '../assets/forward.svg';
import verified from '../assets/verified.svg';

export interface ArtistProps {
    isVerified: boolean,
    name: string,
    listenerCount: string,
    isNavigationDisabled: boolean,
    artistPhoto: string,
}

export function Artist({
  isVerified, name, listenerCount,
  isNavigationDisabled, artistPhoto,
}: ArtistProps) {
  return (
    <div className="wrapper">
      <div className="buttons">
        <button className="navigation-button" type="button" disabled={isNavigationDisabled}>
          <img alt="Go back" className="image" src={back} />
        </button>
        <button className="navigation-button" type="button" disabled={isNavigationDisabled}>
          <img alt="Go next" className="image" src={forward} />
        </button>
      </div>
      <div className="author">
        <div className="author__photo-wrapper">
          <img alt="Author" className="image author__photo" src={artistPhoto} />
        </div>
        <div className="author__info">
          <span className="author__listeners">{listenerCount}</span>
          <span className="author__name">{name}</span>
          {isVerified
            ? (
              <div className="author__verified">
                <div className="image-container image-container--artist">
                  <img alt="Verified artist" className="image" src={verified} />
                </div>
                Verified Artist
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
}

export default Artist;

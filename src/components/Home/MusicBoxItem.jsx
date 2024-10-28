import React from 'react';

const MusicBoxItem = ({ title, artist, imgUrl }) => {
  return (
    <div>
      <img src={imgUrl} loading="lazy" alt={title} />
      <div>
        <span>{title.length > 25 ? `${title.slice(0, 25)}...` : title}</span>
        <span>{artist}</span>
      </div>
    </div>
  );
};

export default MusicBoxItem;

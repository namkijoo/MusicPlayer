import React from 'react';
import styled from 'styled-components';

const MusicBoxItem = ({ title, artist, imgUrl }) => {
  return (
    <MusicBoxItemWrapper>
      <img src={imgUrl} loading="lazy" alt={title} />
      <div>
        <span>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</span>
        <span>{artist}</span>
      </div>
    </MusicBoxItemWrapper>
  );
};

const MusicBoxItemWrapper = styled.div`
  width: 108%;
  height: 50px;
  background-color: #494949;
  margin: 10px;
  display: flex;
  > img {
    margin: 2px;
    width: 45px;
    height: 45px;
    border-radius: 10%;
    margin-left: 5px;
  }
  > div {
    display: flex;
    margin-left: 5px;
    flex-direction: column;
    justify-content: center;
    :nth-child(1) {
      font-size: 15px;
      color: white;
    }
    :nth-child(2) {
      font-size: 14px;
      color: lightgray;
    }
  }
`;

export default MusicBoxItem;

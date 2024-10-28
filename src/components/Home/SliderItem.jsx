import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import React from 'react';

const SliderItem = ({ element }) => {
  return (
    <SliderItemStyle>
      <LazyLoad>
        <img src={element.snippet.thumbnails.medium.url} alt={element.snippet.title} loading="lazy" />
      </LazyLoad>
      <span>{element.snippet.title}</span>
    </SliderItemStyle>
  );
};

const SliderItemStyle = styled.div`
  padding: 0 10px;
  width: 100%;
  text-align: center;

  img {
    width: 100%;
    display: block;
  }
  span {
    color: #dcdada;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;

export default SliderItem;

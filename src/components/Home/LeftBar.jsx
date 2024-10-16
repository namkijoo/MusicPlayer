import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getTopMusic, getRecommendMusic } from '../../api/MusicApi/music.api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from '../Login/Login';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

function LeftBar() {
  const { data } = useQuery({
    queryKey: ['getTopMusic'],
    queryFn: () => getTopMusic(),
    refetchOnWindowFocus: true,
  });

  return (
    <Container>
      <Login />
      <TopMusicWrapper>
        <span>TOP 10 추천</span>
        <span>인기있는 10개의 추천 음악을 같이 즐겨요.</span>
        <CustomSlider {...settings}>
          {data &&
            data.map((element, key) => (
              <SliderItemStyle key={key}>
                <img src={element.snippet.thumbnails.medium.url} alt={`slide-${element.snippet.thumbnails}`} />
                <span>{element.snippet.title}</span>
              </SliderItemStyle>
            ))}
        </CustomSlider>
      </TopMusicWrapper>
      <RecommendMusicWrapper></RecommendMusicWrapper>
    </Container>
  );
}
const CustomSlider = styled(Slider)`
  .slick-dots li button:before {
    color: gray;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    color: white;
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const TopMusicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px;
  > :nth-child(1) {
    color: white;
    margin: 0 10px;
    font-size: 20px;
  }
  > :nth-child(2) {
    color: gray;
    margin: 10px 10px;
    font-size: 15px;
  }
`;

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
  }
`;

const RecommendMusicWrapper = styled.div``;
export default LeftBar;

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getTopMusic } from '../../api/MusicApi/music.api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MusicBoxItem from './MusicBoxItem';
import SliderItem from './SliderItem';
import { useMemo } from 'react';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

const recommendedMusic = [
  {
    title: 'Leellamarz - 거리에서 (feat. ASH ISLAND) [Official Audio] (ENG/JPN/CHN)',
    artist: 'Ambition Musik',
    imgUrl: 'https://i.ytimg.com/vi/fuz2F8GGQKI/mqdefault.jpg',
  },
  {
    title: 'TOIL-검정색하트 (Feat. leellamarz, BE′O) /가사 22.01.30 New Release Audio Lyrics',
    artist: '싸뮤 Sound Of Music',
    imgUrl: 'https://i.ytimg.com/vi/hsEWDAO3zY8/mqdefault.jpg',
  },
  {
    title: 'Lee Young Ji (이영지) - Day & Night (낮 밤) (feat. Jay Park)「Audio」',
    artist: 'K-Pop ASAP',
    imgUrl: 'https://i.ytimg.com/vi/e0AS9MADmEU/mqdefault.jpg',
  },
  {
    title: 'NIve x Sam Kim (니브 x 샘김) - Like a Fool | Official Music Video',
    artist: 'NIve',
    imgUrl: 'https://i.ytimg.com/vi/J2gpmYhX3zc/mqdefault.jpg',
  },
  {
    title: '[M/V] Eldon - Pink cheeks (Lyrics ver.)',
    artist: 'SUPER SOUND Bugs!',
    imgUrl: 'https://i.ytimg.com/vi/G9PeH3VS4LA/mqdefault.jpg',
  },
  {
    title: 'KozyPop - Sameday (Song By kenessi, Denny) (Prod. Seo Mary)',
    artist: 'LINK6',
    imgUrl: 'https://i.ytimg.com/vi/SBDAk5I4Ll4/mqdefault.jpg',
  },
];

function Main() {
  const { data } = useQuery({
    queryKey: ['getTopMusic'],
    queryFn: getTopMusic,
    staleTime: Infinity,
  });

  const recommendedMusicList = useMemo(() => recommendedMusic, []);

  return (
    <Container>
      <TopMusicWrapper>
        <span>TOP 10 추천</span>
        <span>인기있는 10개의 추천 음악을 같이 즐겨요.</span>
        <CustomSlider {...settings}>
          {data && data.map((element, index) => <SliderItem key={index} element={element} />)}
        </CustomSlider>
      </TopMusicWrapper>
      <RecommendMusicWrapper>
        <span>에디터 추천</span>
        <span>에디터가 추천하는 음악을 같이 즐겨요.</span>
        <MusicBox>
          {recommendedMusicList.map((music, index) => (
            <MusicBoxItem key={index} title={music.title} artist={music.artist} imgUrl={music.imgUrl} />
          ))}
        </MusicBox>
      </RecommendMusicWrapper>
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
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  flex-direction: column;
  align-items: center;
  overflow: auto;
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;

  /* Webkit (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TopMusicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 50px;
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

const RecommendMusicWrapper = styled.div`
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

const MusicBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default Main;

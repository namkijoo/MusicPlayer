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
      <RecommendMusicWrapper>
        <span>에디터 추천</span>
        <span>에디터가 추천하는 음악을 같이 즐겨요.</span>
        <MusicBox>
          <div>
            <img src="https://i.ytimg.com/vi/fuz2F8GGQKI/mqdefault.jpg" />
            <div>
              <span>
                {'Leellamarz - 거리에서 (feat. ASH ISLAND) [Official Audio] (ENG/JPN/CHN)'.slice(0, 25) + '...'}
              </span>
              <span>Ambition Musik</span>
            </div>
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/hsEWDAO3zY8/mqdefault.jpg" />
            <div>
              <span>
                {'TOIL-검정색하트 (Feat. leellamarz, BE′O) /가사 22.01.30 New Release Audio Lyrics'.slice(0, 25) +
                  '...'}
              </span>
              <span>싸뮤 Sound Of Music</span>
            </div>
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/e0AS9MADmEU/mqdefault.jpg" />
            <div>
              <span>
                {'Lee Young Ji (이영지) - Day &amp; Night (낮 밤) (feat. Jay Park)「Audio」'.slice(0, 25) + '...'}
              </span>
              <span>K-Pop ASAP</span>
            </div>
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/J2gpmYhX3zc/mqdefault.jpg" />
            <div>
              <span>{'NIve x Sam Kim (니브 x 샘김) - Like a Fool | Official Music Video'.slice(0, 25) + '...'}</span>
              <span>NIve</span>
            </div>
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/G9PeH3VS4LA/mqdefault.jpg" />
            <div>
              <span>{'[M/V] Eldon - Pink cheeks (Lyrics ver.)'.slice(0, 25) + '...'}</span>
              <span>SUPER SOUND Bugs!</span>
            </div>
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/SBDAk5I4Ll4/mqdefault.jpg" />
            <div>
              <span>{'KozyPop - Sameday (Song By kenessi, Denny) (Prod. Seo Mary)'.slice(0, 25) + '...'}</span>
              <span>LINK6</span>
            </div>
          </div>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: 48%;
    height: 50px;
    background-color: #494949;
    margin: 5px;
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
  }
`;
export default LeftBar;

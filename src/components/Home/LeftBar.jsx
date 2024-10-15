import { CiUser } from 'react-icons/ci';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { getTopMusic, getRecommendMusic } from '../../api/MusicApi/music.api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VITE_YOUTUBE_SCOPE = import.meta.env.VITE_YOUTUBE_SCOPE;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

function LeftBar() {
  const login = useGoogleLogin({
    flow: 'implicit', // 'auth-code' 대신 'implicit' 플로우 사용
    onSuccess: (tokenResponse) => {
      localStorage.setItem('token', tokenResponse.access_token);
      console.log(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: VITE_YOUTUBE_SCOPE,
  });

  const { data } = useQuery({
    queryKey: ['getTopMusic'],
    queryFn: () => getTopMusic(),
    refetchOnWindowFocus: true,
  });

  return (
    <Container>
      <TopMenuWrapper>
        <LoginWrapper onClick={login}>
          <CiUser />
          <span>로그인</span>
        </LoginWrapper>
      </TopMenuWrapper>
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

const TopMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding: 10px;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  :nth-child(1) {
    margin-right: 7px;
  }
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: gray;
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

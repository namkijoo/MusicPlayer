import { CiUser } from 'react-icons/ci';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { getTopMusic } from '../../api/MusicApi/music.api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import YouTube from 'react-youtube';

const VITE_YOUTUBE_SCOPE = import.meta.env.VITE_YOUTUBE_SCOPE;

const settings = {
  dots: true, // 하단에 점으로 페이지 네이션 추가
  infinite: true, // 무한 반복
  speed: 500,
  slidesToShow: 3, // 한 번에 보여줄 이미지 수
  slidesToScroll: 3, // 한 번에 넘길 이미지 수
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
        <Slider {...settings}>
          {data &&
            data.map((element, key) => (
              <SliderItemStyle key={key}>
                <img src={element.snippet.thumbnails.medium.url} alt={`slide-${element.snippet.thumbnails}`} />
              </SliderItemStyle>
            ))}
        </Slider>
      </TopMusicWrapper>
    </Container>
  );
}

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
  img {
    width: 100%;
    display: block;
  }
`;
export default LeftBar;

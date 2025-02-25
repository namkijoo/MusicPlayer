import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

const VITE_YOUTUBE_SCOPE = import.meta.env.VITE_YOUTUBE_SCOPE;

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const login = useGoogleLogin({
    flow: 'implicit', // 'auth-code' 대신 'implicit' 플로우 사용
    onSuccess: (tokenResponse) => {
      localStorage.setItem('token', tokenResponse.access_token);
      setIsLoggedIn(true);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: VITE_YOUTUBE_SCOPE,
  });

  const logout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다. ');
    setIsLoggedIn(false);
  };

  const downloadImageAsBlob = async () => {
    const imageUri =
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fvelog.velcdn.com%2Fimages%2Fkcj_dev96%2Fpost%2Ffa647d3f-d927-4dfb-aec0-08bf39ad9ea2%2FreactPosting1.png&type=sc960_832';

    try {
      const response = await fetch(imageUri);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      saveAs(blob, 'reactPosting1.png'); // 다운로드될 파일 이름
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <TopMenuWrapper>
      <LoginWrapper onClick={isLoggedIn ? logout : login}>
        <LoginBtn>
          <button type="button">
            <CiUser />
            {isLoggedIn ? '로그아웃' : '로그인(Click)'}
          </button>
        </LoginBtn>

        <span>{isLoggedIn ? '' : '로그시 음악 검색, 추가, 삭제가 가능해집니다.'}</span>
      </LoginWrapper>
      <button type="button" onClick={downloadImageAsBlob}>
        다운로드
      </button>
    </TopMenuWrapper>
  );
}

const TopMenuWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: gray;
  > span {
    font-size: 12px;
    margin-top: 15px;
    color: #2693bb;
  }
`;

const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    font-size: 15px;
    text-align: center;
    border-radius: 5px;
    padding: 2px;
    cursor: pointer;
  }
`;

export default Login;

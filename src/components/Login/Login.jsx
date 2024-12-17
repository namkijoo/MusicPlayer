import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import styled from 'styled-components';

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
  return (
    <TopMenuWrapper>
      <LoginWrapper onClick={isLoggedIn ? logout : login}>
        <CiUser />
        <span>{isLoggedIn ? '로그아웃' : '로그인'}</span>
      </LoginWrapper>
    </TopMenuWrapper>
  );
}

const TopMenuWrapper = styled.div`
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

export default Login;

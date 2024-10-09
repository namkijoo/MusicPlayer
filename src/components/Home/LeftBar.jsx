import { CiUser } from 'react-icons/ci';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';

const VITE_YOUTUBE_SCOPE = import.meta.env.VITE_YOUTUBE_SCOPE;

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
  return (
    <Container>
      <TopMenuWrappeR>
        <LoginWrapper onClick={login}>
          <CiUser />
          <span>로그인</span>
        </LoginWrapper>
      </TopMenuWrappeR>
    </Container>
  );
}
const Container = styled.div`
  width: 80%;
  background-color: #313131;
`;

const TopMenuWrappeR = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: gray;
`;
export default LeftBar;

import styled from 'styled-components';
import Login from './Login/Login';

function Header() {
  return (
    <Container>
      <span>KIJOO</span>
      <Login />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  > span {
    color: gray;
    font-weight: bold;
  }
`;

export default Header;

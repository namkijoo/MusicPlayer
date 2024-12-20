import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <img src="circle.png" />
      <NavItem
        $isActive={location.pathname === '/'}
        onClick={() => {
          navigate('/');
        }}
      >
        음악홈
      </NavItem>
      <NavItem
        $isActive={location.pathname === '/search'}
        onClick={() => {
          navigate('/search');
        }}
      >
        음악검색
      </NavItem>
    </Container>
  );
}

const Container = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  > img {
    margin-bottom: 20px;
    margin-left: 20px;
    border-radius: 20px;
    width: 65px;
    height: 65px;
  }
`;

const NavItem = styled.span`
  margin: 5px;
  width: 100%;
  padding-left: 20px;
  border-left: ${({ $isActive }) => ($isActive ? '3px solid yellow;' : 'none')};
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? 'white' : 'gray')};
`;
export default Navbar;

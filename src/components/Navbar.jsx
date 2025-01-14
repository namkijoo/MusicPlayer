import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <NavItem
        $isActive={location.pathname === '/'}
        onClick={() => {
          navigate('/');
        }}
      >
        <img src="/homeIcon.png" />
      </NavItem>
      <NavItem
        $isActive={location.pathname === '/search'}
        onClick={() => {
          navigate('/search');
        }}
      >
        <img src="/searchIcon.png" />
      </NavItem>
      <NavItem
        $isActive={location.pathname === '/search'}
        onClick={() => {
          navigate('/search');
        }}
      >
        <img src="/myPageIcon.png" />
      </NavItem>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  height: 70px;
  text-align: center;
  border-top: 1px solid lightgray;
`;

const NavItem = styled.span`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* border-left: ${({ $isActive }) => ($isActive ? '3px solid yellow;' : 'none')}; */
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? 'white' : 'gray')};
  > img {
    width: 32px;
    height: 32px;
  }
`;
export default Navbar;

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchIcon } from '../assets/_index';
import { MyPageIcon } from '../assets/_index';
import { HomeIcon } from '../assets/_index';

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
        <HomeIcon style={{}} />
      </NavItem>
      <NavItem
        $isActive={location.pathname === '/search'}
        onClick={() => {
          navigate('/search');
        }}
      >
        <SearchIcon style={{}} />
      </NavItem>
      <NavItem
        $isActive={location.pathname === '/login'}
        onClick={() => {
          navigate('/login');
        }}
      >
        <MyPageIcon />
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
  background-color: #212020;
  z-index: 99999999999;
`;

const NavItem = styled.span`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* border-left: ${({ $isActive }) => ($isActive ? '3px solid yellow;' : 'none')}; */
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? 'white' : 'gray')};
  :nth-child(1) {
    fill: ${({ $isActive }) => ($isActive ? '#2693bb' : 'lightgray')};
    width: 30px;
    height: 30px;
  }
`;
export default Navbar;

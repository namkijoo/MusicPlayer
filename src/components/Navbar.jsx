import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const location = useLocation();
  return (
    <Container>
      <span>KIJOO</span>
      <img src="circle.png" />
      <NavItem isActive={location.pathname === '/'}>음악홈</NavItem>
      <NavItem isActive={location.pathname === '/search'}>음악검색</NavItem>
    </Container>
  );
}

const Container = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  > :nth-child(1) {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 15px;
    color: gray;
    font-weight: bold;
  }

  > img {
    margin-top: 60px;
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
  border-left: ${({ isActive }) => (isActive ? '3px solid yellow;' : 'none')};
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
`;
export default Navbar;

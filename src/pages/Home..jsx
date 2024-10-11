import styled from 'styled-components';
import LeftBar from '../components/Home/LeftBar';
import RightBar from '../components/Home/RightBar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <Container>
      <Navbar />
      <Outlet />
      <RightBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #313131;

  width: 100vw;
  height: 100vh;
`;

export default Home;

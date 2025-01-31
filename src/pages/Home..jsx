import styled from 'styled-components';
import MusicPlayer from '../components/Home/MusicPlayer';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <Container>
      <Main>
        <MusicPlayer />
        <Navbar />
        <Outlet />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 9999;
  display: flex;
  background-color: #2b2a2a;
  justify-content: center;
  margin: 0 auto;
  max-width: 480px;
  height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;

  /* Webkit (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
export default Home;

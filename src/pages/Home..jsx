import styled from 'styled-components';
import LeftBar from '../components/Home/LeftBar';
import RightBar from '../components/Home/RightBar';

function Home() {
  return (
    <Container>
      <LeftBar />
      <RightBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Home;

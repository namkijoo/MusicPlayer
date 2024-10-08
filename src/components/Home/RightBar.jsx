import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlaylistItem } from '../../api/MusicApi/music.api';
import YouTube from 'react-youtube';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

function RightBar() {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  useEffect(() => {
    const getPlayList = async () => {
      const playlist = await getPlaylistItem();
      if (playlist) {
        setPlaylistItems(playlist.items);
      }
    };

    getPlayList();
  }, []);

  const onClickMusicList = (index) => {
    setCurrentAudioIndex(index);
  };

  return (
    <Container>
      <MusicPlayerWrapper>
        {playlistItems.length > 0 && (
          <>
            <YouTube
              key={currentAudioIndex}
              videoId={playlistItems[currentAudioIndex].snippet.resourceId.videoId}
              opts={{
                width: '100%',
                height: '200px',
                playerVars: { autoplay: 1 },
              }}
              style={{ display: 'none' }}
            />
            <MusicPlayer>
              <img src={playlistItems[currentAudioIndex].snippet.thumbnails.medium.url} />
              <span>{playlistItems[currentAudioIndex].snippet.title}</span>
              <span>{playlistItems[currentAudioIndex].snippet.videoOwnerChannelTitle}</span>
              <ProgressBarWrapper>
                <ProgressBar progress="20" />
              </ProgressBarWrapper>
              <MusicPlayerBtnWrapper>
                <Btn>
                  <FaChevronLeft />
                </Btn>
                <Btn>{false ? <FaPause /> : <FaPlay />}</Btn>
                <Btn>
                  <FaChevronRight />
                </Btn>
              </MusicPlayerBtnWrapper>
            </MusicPlayer>
          </>
        )}
      </MusicPlayerWrapper>
      <MusicListsWrapper>
        {playlistItems &&
          playlistItems.map((element, key) => (
            <MusicList key={key}>
              <img src={element.snippet.thumbnails.default.url} />
              <MusicInfo onClick={() => onClickMusicList(key)}>
                <span>
                  {element.snippet.title.length > 10
                    ? element.snippet.title.slice(0, 40) + '...'
                    : element.snippet.title}
                </span>
                <span>
                  {element.snippet.videoOwnerChannelTitle.length > 10
                    ? element.snippet.videoOwnerChannelTitle.slice(0, 40) + '...'
                    : element.snippet.videoOwnerChannelTitle}
                </span>
              </MusicInfo>
            </MusicList>
          ))}
      </MusicListsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  background-color: #1d1c1c;
`;

const MusicPlayerWrapper = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const MusicListsWrapper = styled.div`
  height: 50%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const MusicList = styled.div`
  > img {
    height: 50px;
    width: 50px;
  }

  margin: 5px 10px;
  color: white;
  display: flex;
`;

const MusicPlayer = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  > img {
    width: 150px;
    height: 150px;
  }
  > :nth-child(2) {
    margin: 5px;
    margin-top: 10px;
    color: white;
    font-size: 12px;
  }
  > :nth-child(3) {
    color: gray;
    font-size: 11px;
  }
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  :nth-child(1) {
    font-size: 12px;
    margin-left: 10px;
  }
  :nth-child(2) {
    font-size: 12px;
    margin-left: 10px;
    color: #797777;
  }
`;

const MusicPlayerBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    <Icon>{children}</Icon>
  </StyledButton>
);

const StyledButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 18px;
  margin: 0 10px;
  color: white;
`;

const ProgressBarWrapper = styled.div`
  width: 95%;
  margin: 20px auto;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 2px;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => `${progress}%`};
  background-color: #3b5998;
  height: 100%;
  transition: width 0.1s ease-in-out;
`;
export default RightBar;

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { deleteMusicList, getPlaylistItem } from '../../api/MusicApi/music.api';
import YouTube from 'react-youtube';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { musicStore } from '../../store/musicStore';
import { RiDeleteBin5Line } from 'react-icons/ri';

function MusicPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [position, setPosition] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ['getPlaylistItem'],
    queryFn: () => getPlaylistItem(),
    refetchOnWindowFocus: true,
  });

  const { setMusicList, setcurrentIndex } = musicStore();

  useEffect(() => {
    setMusicList(data);
  }, [data]);

  useEffect(() => {
    setcurrentIndex(currentAudioIndex);
  }, [currentAudioIndex]);

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      intervalRef.current = setInterval(updateProgress, 1000);
    } else if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentAudioIndex]);

  const onClickMusicList = useCallback((index) => {
    setCurrentAudioIndex(index);
  }, []);

  const playNextAudio = useCallback(() => {
    setCurrentAudioIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0));
  }, [data]);

  const playPrevAudio = useCallback(() => {
    setCurrentAudioIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
  }, [data]);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;

    playerRef.current.addEventListener('onStateChange', onPlayerStateChange);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
      setIsPlaying(false);
    }
  };

  const onPlayerEnd = () => {
    playNextAudio();
  };

  const onProgressBarClick = (e) => {
    if (playerRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newProgress = (clickPosition / rect.width) * 100;
      const newTime = (playerRef.current.getDuration() * newProgress) / 100;
      playerRef.current.seekTo(newTime, true);
      setProgress(newProgress);
    }
  };

  const updateProgress = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      setProgress((currentTime / duration) * 100);
    }
  };

  const onDeleteBtnClick = async (playlistItemId) => {
    if (!localStorage.getItem('token')) {
      alert('로그인 후 삭제가능합니다. ');
    } else {
      const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

      if (confirmDelete) {
        try {
          const result = await deleteMusicList(playlistItemId);

          if (result.success) {
            alert('삭제되었습니다.');
            setTimeout(async () => {
              await refetch();
            }, 1000);
          } else {
            alert(`삭제하는데 실패했습니다. ${result.message}`);
          }
        } catch (error) {
          alert(`삭제하는데 실패했습니다. ${result.message}`);
          console.error('삭제 중 에러 발생: ', error);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    }
  };
  return (
    <Container>
      <MusicPlayerWrapper $position={position}>
        {Array.isArray(data) && data.length > 0 && (
          <>
            <YouTube
              key={currentAudioIndex}
              videoId={data[currentAudioIndex].snippet.resourceId.videoId}
              opts={{
                playerVars: { autoplay: 1 },
              }}
              style={{ display: 'none' }}
              onReady={onPlayerReady}
              onEnd={onPlayerEnd}
            />
            <MusicPlayers>
              <img src={data[currentAudioIndex].snippet.thumbnails.medium.url} onClick={() => setPosition(!position)} />
              <span>{data[currentAudioIndex].snippet.title}</span>
              <span>{data[currentAudioIndex].snippet.videoOwnerChannelTitle}</span>
              <ProgressBarWrapper onClick={onProgressBarClick}>
                <ProgressBar progress={progress} />
              </ProgressBarWrapper>
              <MusicPlayerBtnWrapper>
                <Btn onClick={playPrevAudio}>
                  <FaChevronLeft />
                </Btn>
                <Btn onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</Btn>
                <Btn onClick={playNextAudio}>
                  <FaChevronRight />
                </Btn>
              </MusicPlayerBtnWrapper>
            </MusicPlayers>
          </>
        )}
      </MusicPlayerWrapper>
      <MusicListsWrapper>
        <span>재생목록</span>
        {data &&
          data.map((element, key) => (
            <MusicList key={key} $playing={currentAudioIndex === key}>
              <DeleteBtn onClick={() => onDeleteBtnClick(element.id)}>
                <RiDeleteBin5Line />
              </DeleteBtn>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1d1c1c;
`;

const MusicPlayerWrapper = styled.div`
  width: ${({ $position }) => ($position ? '100%' : '80%')};
  height: ${({ $position }) => ($position ? '' : '100%')};
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(120deg, #ff6f61, #444444, #1d1c1c);
  position: ${({ $position }) => ($position ? 'static' : 'fixed')};
  top: 0;
  left: 0;
`;
const MusicListsWrapper = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  > span {
    margin: 0 10px;
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    font-weight: bold;
  }
`;

const MusicList = styled.div`
  border: ${({ $playing }) => ($playing ? '1px solid lightgray' : 'none')};

  > img {
    height: 50px;
    width: 50px;
  }

  margin: 5px 10px;
  color: white;
  display: flex;
  cursor: pointer;
`;

const MusicPlayers = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  > img {
    width: 55%;
    height: 45%;
    cursor: pointer;
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

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  > :nth-child(1) {
    margin-right: 5px;
  }
`;

const MusicPlayerBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
  height: 5px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => `${progress}%`};
  background-color: #3b5998;
  height: 100%;
  transition: width 0.1s ease-in-out;
`;
export default MusicPlayer;

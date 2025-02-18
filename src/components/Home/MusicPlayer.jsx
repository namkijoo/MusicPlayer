import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { deleteMusicList, getPlaylistItem } from '../../api/MusicApi/music.api';
import YouTube from 'react-youtube';
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { FaPause } from '@react-icons/all-files/fa/FaPause';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';

import { useQuery } from '@tanstack/react-query';
import { musicStore } from '../../store/musicStore';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ListIcon } from '../../assets/_index';

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
      <ProgressBarWrapper onClick={onProgressBarClick}>
        <ProgressBar progress={progress} />
      </ProgressBarWrapper>
      <MusicPlayerWrapper>
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
              <span>
                {data[currentAudioIndex].snippet.title.length > 30
                  ? data[currentAudioIndex].snippet.title.slice(0, 30) + '...'
                  : data[currentAudioIndex].snippet.title}
              </span>
              <span>{data[currentAudioIndex].snippet.videoOwnerChannelTitle}</span>
            </MusicPlayers>
            <MusicPlayerBtnWrapper>
              <Btn onClick={playPrevAudio}>
                <FaChevronLeft />
              </Btn>
              <Btn onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</Btn>
              <Btn onClick={playNextAudio}>
                <FaChevronRight />
              </Btn>
              <ListIcon
                style={{
                  width: '25px',
                  height: '25px',
                  fill: 'white',
                  marginLeft: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setPosition(!position)}
              />
            </MusicPlayerBtnWrapper>
          </>
        )}
      </MusicPlayerWrapper>
      <MusicListsWrapper $position={position}>
        <span>재생목록</span>
        {data &&
          (data || [])?.map((element, key) => (
            <MusicList key={key} $playing={currentAudioIndex === key}>
              <img src={element?.snippet?.thumbnails?.default?.url || ''} />
              <MusicInfo onClick={() => onClickMusicList(key)}>
                <span>
                  {element?.snippet?.title?.length > 40
                    ? element?.snippet?.title.slice(0, 40) + '...'
                    : element?.snippet?.title || '제목 없음'}
                </span>
                <span>
                  {element?.snippet?.videoOwnerChannelTitle?.length > 40
                    ? element?.snippet?.videoOwnerChannelTitle.slice(0, 40) + '...'
                    : element?.snippet?.videoOwnerChannelTitle || '채널 정보 없음'}
                </span>
              </MusicInfo>
              <DeleteBtn onClick={() => onDeleteBtnClick(element?.id)}>
                <RiDeleteBin5Line />
              </DeleteBtn>
            </MusicList>
          ))}
      </MusicListsWrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  position: fixed;
  z-index: 999;
  width: 100%;
  max-width: 480px;
  bottom: 70px;
  background-color: #212020;
  border-top: 1px solid #313030;
`;

const MusicPlayerWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 5px 20px;
`;
const MusicListsWrapper = styled.div`
  position: fixed;
  display: ${({ $position }) => ($position ? 'none' : 'flex')}; /* $position이 true일 때 display: none */
  padding: 0 20px;
  padding-top: 20px;
  top: 0;
  max-width: 480px;
  z-index: 10;
  height: calc(100vh - 130px);
  width: 100%;
  background: linear-gradient(to bottom, #0c0c0c, #454546, #939292); /* 오른쪽 위에서 흐려짐 */
  overflow: auto;
  flex-direction: column;
  > span {
    margin: 8px;
    margin-bottom: 20px;
    font-size: 20px;
    color: white;
    font-weight: bold;
  }
`;

const MusicList = styled.div`
  border: ${({ $playing }) => ($playing ? '1px solid lightgray' : 'none')};
  padding: 5px;
  position: relative;
  > img {
    height: 50px;
    width: 50px;
  }

  color: white;
  display: flex;
  cursor: pointer;
`;

const MusicPlayers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 65%;
  :nth-child(1) {
    color: white;
  }
  :nth-child(2) {
    color: white;
    font-size: 12px;
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
    color: #a7a5a5;
  }
`;

const DeleteBtn = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
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
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 2px;
  position: absolute;
  top: 0;
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

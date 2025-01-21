import styled from 'styled-components';
import { FaPause, FaPlay, FaPlus, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { getSearchMusicList, postMusicList } from '../../api/MusicApi/music.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import YouTube from 'react-youtube';

function MusicSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setFetchData(true);
    refetch();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const { data = [], refetch } = useQuery({
    queryKey: ['getSearchMusicList'],
    queryFn: () => getSearchMusicList(searchTerm),
    enabled: fetchData && searchTerm.length > 0,
    refetchOnWindowFocus: true,
  });

  const onClickMusicList = (index, videoId) => {
    setCurrentAudioIndex(index);
    setVideoId(videoId);
    setIsPlaying(true);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (videoId) => postMusicList(videoId),
    onSuccess: () => {
      alert('추가 되었습니다.');
      queryClient.invalidateQueries('getPlaylistItem');
    },
    onError: (error) => {
      alert('잠시 후 다시 시도해주세요.');
    },
  });

  const addOnClick = async (videoId) => {
    if (!localStorage.getItem('token')) {
      alert('로그인 후 추가해주세요. ');
    } else {
      const confirmDelete = window.confirm('추가하시겠습니까?');

      if (confirmDelete) {
        try {
          mutate(videoId);
        } catch (error) {
          console.error('삭제 중 에러 발생: ', error);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const highlightSearchTerm = (title) => {
    if (!searchTerm) return title;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return title.replace(regex, `<span style="color: #2693bb;">$1</span>`);
  };

  return (
    <Container>
      <Title>음악 검색</Title>
      <SearchWrapper>
        <input
          placeholder="검색어를 입력해주세요."
          onChange={onChangeSearch}
          value={searchTerm}
          onKeyDown={handleEnter}
        />
        <FaSearch onClick={handleSearchClick} />
      </SearchWrapper>
      {videoId && <YouTube videoId={videoId} opts={opts} style={{ display: 'none' }} onReady={onPlayerReady} />}
      <MusicListWrapper>
        {data.length > 0 ? (
          data.map((element, index) => (
            <MusicList key={index}>
              <MusicListLeft>
                <img src={element.snippet.thumbnails.medium.url} alt="thumbnail" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(
                      element.snippet.title.length > 40
                        ? element.snippet.title.slice(0, 40) + '...'
                        : element.snippet.title,
                    ),
                  }}
                ></span>
              </MusicListLeft>
              <MusicListRight>
                {currentAudioIndex === index && isPlaying ? (
                  <FaPause onClick={togglePlayPause} />
                ) : (
                  <FaPlay onClick={() => onClickMusicList(index, element.id.videoId)} />
                )}
                <FaPlus onClick={() => addOnClick(element.id.videoId)} />
              </MusicListRight>
            </MusicList>
          ))
        ) : (
          <EmptyState>
            <SuggestionList>
              <h4>인기 검색어:</h4>
              <ul>
                <li>#Billboard</li>
                <li>#KPop</li>
                <li>#TopHits</li>
              </ul>
            </SuggestionList>
          </EmptyState>
        )}
      </MusicListWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  padding: 0 60px;
`;

const Title = styled.p`
  font-size: 25px;
  margin-top: 20px;
  font-weight: bold;
  color: white;
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  position: relative;
  align-items: center;
  > input {
    height: 35px;
    width: 100vw;
    border: none;
    border-bottom: 2px solid white;
    background-color: inherit;
    color: white;
    outline: none;
    padding-right: 20px;
  }
  > :nth-child(2) {
    font-size: 15px;
    position: absolute;
    right: 0;
    color: #e3e3e3;
  }
`;

const MusicListWrapper = styled.div`
  width: 100%;
  padding: 5px;
  overflow: scroll;
`;

const MusicList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const MusicListLeft = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 80px;
  }
  > span {
    color: lightgray;
    margin-left: 20px;
    font-size: 13px;
  }
`;

const MusicListRight = styled.div`
  display: flex;
  color: gray;

  :nth-child(1) {
    cursor: pointer;
    &:hover {
      color: lightgray;
    }
  }
  :nth-child(2) {
    margin-left: 10px;
    &:hover {
      color: lightgray;
    }
    cursor: pointer;
  }
`;

const EmptyState = styled.div`
  margin-top: 100px;
  text-align: center;
  color: lightgray;
`;

const SuggestionList = styled.div`
  > h4 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #9bb1b9;
  }
  > ul {
    list-style: none;
    padding: 0;
    > li {
      margin: 5px 0;
      cursor: pointer;
      color: gray;
      &:hover {
        color: white;
      }
    }
  }
`;

export default MusicSearch;

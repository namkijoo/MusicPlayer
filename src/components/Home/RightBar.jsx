import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlaylistItem } from '../../api/MusicApi/music.api';
import YouTube from 'react-youtube';

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
          <YouTube
            videoId={playlistItems[currentAudioIndex].snippet.resourceId.videoId}
            opts={{
              width: '100%',
              height: '200px',
              playerVars: { autoplay: 1 },
            }}
          />
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
  height: 40%;
  width: 100%;
`;
const MusicListsWrapper = styled.div`
  height: 60%;
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

export default RightBar;

import styled from 'styled-components';
import Login from '../Login/Login';
import { FaPlay, FaPlus, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { getSearchMusicList } from '../../api/MusicApi/music.api';
import { useQuery } from '@tanstack/react-query';
import { BiPlay, BiPlus } from 'react-icons/bi';

function MusicSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchData, setFetchData] = useState(false);

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
    enabled: fetchData,
    refetchOnWindowFocus: true,
  });

  return (
    <Container>
      <Login />
      <SearchWrapper>
        <FaSearch onClick={handleSearchClick} />
        <span>검색</span>
        <input onChange={onChangeSearch} value={searchTerm} onKeyDown={handleEnter} />
      </SearchWrapper>
      <Line />
      <MusicListWrapper>
        {data.length > 0 ? (
          data.map((element, index) => (
            <MusicList key={index}>
              <MusicListLeft>
                <img src={element.snippet.thumbnails.medium.url} />
                <span>
                  {element.snippet.title.length > 40
                    ? element.snippet.title.slice(0, 40) + '...'
                    : element.snippet.title}
                </span>
              </MusicListLeft>
              <MusicListRight>
                <FaPlay />
                <FaPlus />
              </MusicListRight>
            </MusicList>
          ))
        ) : (
          <ResultImg src="/search.png" />
        )}
      </MusicListWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 0 60px;
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  :nth-child(1) {
    bottom: 9px;
    position: absolute;
    right: 10px;
    font-size: 17px;
    color: #383737;
    cursor: pointer;
  }
  > input {
    border-radius: 20px;
    height: 30px;
    width: 180px;
    padding-left: 5px;
    padding-right: 30px;
    background-color: lightgray;
  }
  > span {
    font-size: 28px;
    color: white;
    font-weight: bold;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  margin-top: 40px;
  border-top: 0.1px dotted gray;
`;

const ResultImg = styled.img`
  margin-top: 180px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const MusicListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
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
    margin-left: 10px;
  }
`;

const MusicListRight = styled.div`
  display: flex;
  color: gray;

  :nth-child(1) {
    cursor: pointer;
  }
  :nth-child(2) {
    margin: 0 20px;
    cursor: pointer;
  }
`;

export default MusicSearch;

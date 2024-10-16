import styled from 'styled-components';
import Login from '../Login/Login';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { getSearchMusicList } from '../../api/MusicApi/music.api';
import { useQuery } from '@tanstack/react-query';

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

  const { data = [], refetch } = useQuery({
    queryKey: ['getSearchMusicList', searchTerm],
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
        <input onChange={onChangeSearch} value={searchTerm} />
      </SearchWrapper>
      <Line />

      {data.length > 0 ? (
        data.map((element, index) => <div key={index}>{element.snippet.title}</div>)
      ) : (
        <ResultImg src="/search.png" />
      )}
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
`;

export default MusicSearch;

import axiosInstance from '../api';

const VITE_YOUTUBE_PLAYLIST_KEY = import.meta.env.VITE_YOUTUBE_PLAYLIST_KEY;
const VITE_YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getPlaylistItem = async () => {
  try {
    const response = await axiosInstance.get('/playlistItems', {
      params: {
        part: 'snippet',
        playlistId: VITE_YOUTUBE_PLAYLIST_KEY,
        key: VITE_YOUTUBE_API_KEY,
        maxResults: 50,
      },
    });
    console.log(response.data);
    return response.data.items;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};

export const getTopMusic = async () => {
  try {
    const response = await axiosInstance.get('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'KR',
        maxResults: '10',
        videoCategoryId: 10,
        key: VITE_YOUTUBE_API_KEY,
      },
    });
    console.log('popular', response.data);
    return response.data.items;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};

export const getRecommendMusic = async (videoId) => {
  try {
    const response = await axiosInstance.get('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        key: VITE_YOUTUBE_API_KEY,
      },
    });

    if (response.data && response.data.items) {
      return response.data.items; // 추천 음악 데이터 반환
    } else {
      return []; // 추천 음악 데이터가 없을 경우 빈 배열 반환
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const deleteMusicList = async (playlistItemId) => {
  try {
    const response = await axiosInstance.delete(`/playlistItems/?id=${playlistItemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 204) {
      return { success: true, message: 'Item deleted successfully' };
    }
    return { success: false, message: 'Failed to delete item' };
  } catch (error) {
    console.log(error);
  }
};

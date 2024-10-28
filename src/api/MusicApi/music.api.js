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
      return response.data.items;
    } else {
      return [];
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return [];
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

export const getSearchMusicList = async (searchTerm) => {
  try {
    const response = await axiosInstance.get(`/search`, {
      params: {
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        maxResults: 10,
        videoCategoryId: 10,
        key: VITE_YOUTUBE_API_KEY,
      },
    });
    console.log(response.data);
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const postMusicList = async (videoId) => {
  try {
    await axiosInstance.post(
      '/playlistItems',
      {
        snippet: {
          playlistId: VITE_YOUTUBE_PLAYLIST_KEY,
          resourceId: {
            kind: 'youtube#video',
            videoId: videoId,
          },
        },
      },
      {
        params: {
          part: 'snippet',
          key: VITE_YOUTUBE_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

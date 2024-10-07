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
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};

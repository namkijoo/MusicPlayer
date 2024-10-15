import { create } from 'zustand';

export const musicStore = create((set) => ({
  musicList: null,
  currentAudioIndex: null,
  setMusicList: (musicList) => set({ musicList }),
  setcurrentIndex: (currentAudioIndex) => set({ currentAudioIndex }),
}));

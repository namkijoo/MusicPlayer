import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 빌드 파일이 생성될 폴더
  },
  base: './', // 정적 파일을 상대 경로로 설정
});

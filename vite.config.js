import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false, // ReactComponent 방식 사용
      svgrOptions: {
        icon: true, // 아이콘 옵션 활성화
      },
    }),
  ],
});

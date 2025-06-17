import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Node.js 모듈을 브라우저에서 사용할 수 있도록 폴리필 추가
    nodePolyfills({
      // Node.js 전역 변수 폴리필 추가
      globals: {
        process: true,
      },
      // fs 및 path 모듈 폴리필 추가
      include: ['fs', 'path', 'url'],
      // 폴리필 옵션 설정 (타입 오류 수정)
      protocolImports: true,
    }),
  ],
});

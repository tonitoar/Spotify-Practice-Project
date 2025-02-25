import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Spotify-Practice-Project/', // Replace with your GitHub repository name
  build: {
    outDir: 'dist', // Ensure output is in 'dist'
  },
});

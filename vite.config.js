import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
  base: './',
  root: 'src',
  build: {
    rollupOptions: {
      inputs: {
        home: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
      }
    }
  }
})
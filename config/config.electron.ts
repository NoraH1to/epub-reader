import { defineConfig } from 'umi';
import routes from './routes';

/**
 * @description 基础环境
 */
export default defineConfig({
  history: {
    type: 'hash',
  },
  publicPath: './',
});

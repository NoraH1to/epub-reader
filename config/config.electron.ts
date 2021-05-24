import { defineConfig } from 'umi';
import path from 'path';

/**
 * @description 基础环境
 */
export default defineConfig({
  publicPath: './',
  define: {
    NODE_ENV: 'dev',
    HOST: `http://localhost:8989`,
  },
});

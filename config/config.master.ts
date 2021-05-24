import { defineConfig } from 'umi';

/**
 * @description 毕设演示生产环境
 */
export default defineConfig({
  mock: false,
  define: {
    NODE_ENV: 'prod',
  },
});

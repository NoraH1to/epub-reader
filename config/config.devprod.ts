import { defineConfig } from 'umi';

/**
 * @description 开发环境生产接口环境
 */
export default defineConfig({
  mock: false,
  define: {
    BASE_URL: 'http://xxxx', // TODO: prod host
    NODE_ENV: 'prod',
    HOST: `http://localhost:8200`,
  },
});

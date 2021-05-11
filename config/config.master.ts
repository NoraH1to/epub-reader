import { defineConfig } from 'umi';

/**
 * @description 毕设演示生产环境
 */
export default defineConfig({
  mock: false,
  define: {
    BASE_URL: 'http://xxxx', // TODO: prod host
    NODE_ENV: 'prod',
    HOST: 'http://zscnsd.norah1to.com:3001',
  },
});

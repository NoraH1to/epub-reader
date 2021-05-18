import { defineConfig } from 'umi';
import routes from './routes';

/**
 * @description 基础环境
 */
export default defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  devServer: {
    port: 8100,
  },
  hash: true,
  sass: {},
  fastRefresh: {},
  dynamicImport: { loading: '@/components/LoadingPage' },
  define: {
    BASE_URL: undefined,
    NODE_ENV: 'dev',
    HOST: `http://localhost:8100`,
  },
});

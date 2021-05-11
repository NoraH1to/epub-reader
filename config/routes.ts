import { IRoute } from '@umijs/types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/pages/index.tsx',
    wrappers: ['@/wrapper/MdUI.tsx'],
    __isDynamic: true,
  },
];

export default routes;

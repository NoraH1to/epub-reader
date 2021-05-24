import { IRoute } from '@umijs/types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/pages/index.tsx',
    wrappers: ['@/wrapper/Theme.tsx', '@/wrapper/MdUI.tsx'],
    __isDynamic: true,
  },
  {
    path: '/bookList',
    component: '@/pages/bookList.tsx',
    // wrappers: ['@/wrapper/Theme.tsx', '@/wrapper/MdUI.tsx'],
  },
];

export default routes;

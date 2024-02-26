import { lazy } from 'react';

const Main = lazy(() => import('src/pages/Main'));
const Test = lazy(() => import('src/pages/Test'));
export const ROUTES = [
  {
    path: '/',
    auth: true,
    name: '메인',
    node: Main,
  },
  {
    path: '/test',
    auth: true,
    name: '테스트',
    node: Test,
  },
];

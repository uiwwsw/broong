import { lazy } from 'react';

const Button = lazy(() => import('src/pages/Button'));
const Combo = lazy(() => import('src/pages/Combo'));
export const ROUTES = [
  {
    path: '/',
    auth: true,
    name: '버튼',
    node: Button,
  },
  {
    path: '/combo',
    auth: true,
    name: '콤보박스',
    node: Combo,
  },
];

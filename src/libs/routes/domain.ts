import { lazy } from 'react';

const Button = lazy(() => import('src/pages/Button'));
const Combo = lazy(() => import('src/pages/Combo'));
const Form = lazy(() => import('src/pages/Form'));
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
  {
    path: '/form',
    auth: true,
    name: '폼',
    node: Form,
  },
];

import Judge1 from './components/Judge1';
import Judge2 from './components/Judge2';
import Judge3 from './components/Judge3';
import Judge4 from './components/Judge4';
import Judge5 from './components/Judge5';

export default [
  { path: '/', exact: true, private: false, component: Judge1 },
  { path: '/Judge1', private: false, component: Judge1 },
  { path: '/Judge2', private: true, component: Judge2 },
  { path: '/Judge3', private: true, component: Judge3 },
  { path: '/Judge4', private: true, component: Judge4 },
  { path: '/Judge5', private: true, component: Judge5 },
];

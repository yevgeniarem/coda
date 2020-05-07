import Login from './componentsContainer/Login';
import Events from './componentsContainer/Events';
import TourDates from './componentsContainer/TourDates';
import Judges from './componentsContainer/Judges';
import Scoring from './componentsContainer/Scoring';

export default [
  { path: '/', exact: true, privateRoute: false, component: Login },
  { path: '/Login', privateRoute: false, component: Login },
  { path: '/Events', privateRoute: true, component: Events },
  { path: '/TourDates', privateRoute: true, component: TourDates },
  { path: '/Judges', privateRoute: true, component: Judges },
  { path: '/Scoring', privateRoute: true, component: Scoring },
];

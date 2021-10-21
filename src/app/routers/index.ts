import { ROUTERS } from '../constants';

export const ThemeRouters = [
  {
    path: ROUTERS.DASHBOARD,
    name: 'menu.dashboard',
    icon: 'fas fa-home',
    match: 'dashboard',
    scopes: 'DASHBOARD',
  },
  {
    name: 'menu.user',
    icon: 'fas fa-user-friends',
    path: ROUTERS.LIST_USER,
    match: 'user',
    scopes: 'USER',
  },
  {
    name: 'menu.location',
    icon: 'fas fa-map-marker-alt',
    match: 'location',
    path: ROUTERS.LIST_LOCATION,
    scopes: 'WHERE',
  },
  {
    name: 'menu.food',
    path: ROUTERS.LIST_FOOD,
    icon: 'fas fa-utensils',
    match: 'page-food',
    scopes: 'FOOD',
  },
  {
    name: 'menu.tour',
    icon: 'fas fa-hiking',
    match: 'page-tour',
    path: ROUTERS.LIST_TOUR,
    scopes: 'TOUR',
  },
  {
    name: 'menu.activity',
    icon: 'fas fa-star',
    path: ROUTERS.LIST_ACTIVITY,
    match: 'activity',
    scopes: 'ACTIVITY',
  },
  {
    name: 'menu.post',
    icon: 'fas fa-file-alt',
    path: ROUTERS.LIST_POST,
    match: 'post',
    scopes: 'POST',
  },
  {
    name: 'menu.report',
    path: ROUTERS.LIST_REPORT,
    icon: 'fas fa-exclamation-triangle',
    match: 'report',
  },
  {
    name: 'menu.admin',
    icon: 'fas fa-cog',
    match: 'system',
    path: ROUTERS.LIST_FEEDBACK,
  },
];

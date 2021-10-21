import Images from 'app/assets/images';

export const IMAGE_URL = {
  URL:
    'https://api.unsplash.com/photos/random?client_id=luqNSeI1hEAvT6PeE1GtPc9Mq5WmXUO6ZwKV6DLoYFg&count=25',
  URL_VIDEO:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',

  URL_IMAGE_FEEDBACK: 'http://157.230.252.152:3000/media-contents/upload',
};

export const CROP_TYPES = {
  NORMAL: 1 / 1,
  OPTIMIZATION_WIDTH_SS: 16 / 9,
  OPTIMIZATION_WIDTH_XL: 1.91 / 1,
  OPTIMIZATION_HEIGHT: 4 / 5,
};

export const VND = 'VND';

export const LANGUAGES = {
  VN: 'vi-VN',
  EN: 'en-EN',
};

export const KEY_PRESS = {
  ENTER: 'Enter',
};

export const BASE_API =
  process.env.REACT_APP_BASE_API || 'http://localhost:4000/';

export const DOMAIN_MEDIA_CONTENT = process.env.REACT_APP_DOMAIN_MEDIA_CONTENT;
export const IMAGE_STORE = '';

export const FILTER = {
  NEWEST: ['createdAt DESC'],
  OLDEST: ['createdAt ASC'],
  RANKING: [],
  ID_NEWEST: ['id DESC'],
  ID_OLDEST: ['id ASC'],
  CHANGE_LOCATION: ['status.keyword DESC', 'createdAt DESC'],
  REPORT: ['reportStatus DESC', 'createdAt DESC'],
};

export const SORT = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const NOTIFICATION_TYPES = {
  SYSTEM_NEW_FEEDBACK: 'SYSTEM_NEW_FEEDBACK',
  SYSTEM_NEW_REPORT: 'SYSTEM_NEW_REPORT',
  SYSTEM_NEW_LOCATION_REQUEST: 'SYSTEM_NEW_LOCATION_REQUEST',
};

export const REPORT_VALUES = {
  POST: 'REPORT_POST',
  LOCATION: 'REPORT_LOCATION',
  USER: 'REPORT_USER',
  RANKING: 'REPORT_RANKING',
};

export const VERIFY_TYPES = {
  FALSE: false,
  TRUE: true,
};

export const STATUS_CHANGE_LOCATION_TYPES = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

export const CANCEL = 'cancel';

export const VIDEO_TYPES = {
  VIDEO: 'VIDEO',
};

export const LOGIN_URL = {
  LOGIN: '/login',
};

export const IMAGE_TYPES = {
  IMAGE: 'IMAGE',
  UPLOAD: 'UPLOAD',
};

export const METHOD_API = {
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  GET: 'GET',
};

export const SEARCH_TYPES = {
  TIME: 'TIME',
  OWNER: 'OWNER',
  STATUS: 'STATUS',
  DEFAULT: 'DEFAULT',
  DRAFT: 'DRAFT',
  COMPLETED: 'COMPLETED',
  TYPE: 'TYPE',
  CREATED: 'CREATED',
  POST: 'POST',
  MINE: 'MINE',
};

export const TOUR_TYPES = {
  HOLYDAY_TOUR: 'HOLYDAY_TOUR',
  NORMAL_TOUR: 'NORMAL_TOUR',
};

export const ROUTER_PATH = {
  LOCATION: 'location',
  POST: 'post',
  FOOD: 'page-food',
  TOUR: 'page-tour',
  ACTIVITY: 'activity',
};

export const EVENTS = {
  LOCK_REQUEST: 'LOCK_REQUEST',
};

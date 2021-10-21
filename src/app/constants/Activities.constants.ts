import Images from 'app/assets/images';

export const DATA_IMG_DEFAULT = [
  {
    url: Images.background.default,
  },
  {
    url: Images.background.default,
  },
  {
    url: Images.background.default,
  },
  {
    url: Images.noData.default,
  },
  {
    url: Images.background.default,
  },
];

export const ACTIVITY_POST_TYPES = {
  MEDIA: 'MEDIA',
  MEMBER_JOIN: 'MEMBER_JOIN',
  LIKE: 'LIKE',
  SHARE: 'SHARE',
  COMMENT: 'COMMENT',
};

export const ACTIVITY_STATUS_TYPES = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN PROGRESS',
  IN_PAST: 'IN PAST',
  PUBLIC: 'PUBLIC',
  DRAFT: 'DRAFT',
};

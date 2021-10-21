import Images from 'app/assets/images';
import {
  DASHBOARD_TYPES,
  MY_MAP_TYPES,
  SCOPES_TYPES,
  CONVERT_ROLES_TYPE,
  CUSTOM_ROLES_TYPES,
} from 'app/constants';
import { GENDER, USER_ROLES } from 'app/constants/User.constants';
import { t } from 'app/i18n';

export const getFiledUsers = () => [
  {
    id: 'name.keyword',
    name: t('user.name'),
    show: true,
  },
  {
    id: 'email.email.keyword',
    name: t('user.email'),
    show: true,
  },
  {
    name: t('user.phone'),
    id: 'profiles.phone.phone.keyword',
    show: true,
  },
  {
    name: t('user.address'),
    id: 'address',
    show: false,
  },
  {
    name: t('user.birthday'),
    show: true,
    id: 'birthday',
  },
  {
    id: 'createdAt',
    name: t('user.created'),
    show: true,
  },
  {
    id: 'permission',
    name: t('user.permission'),
    show: false,
  },
  {
    id: 'action',
    name: t('user.action'),
    show: true,
  },
  {
    name: t('user.gender'),
    show: false,
    id: 'gender',
  },
  {
    name: t('user.job'),
    id: 'job',
    show: false,
  },
  {
    name: t('user.online'),
    show: false,
    id: 'isOnline',
  },
  {
    name: t('user.count_posts'),
    show: false,
    id: 'totalPost',
  },
  {
    name: t('user.count_locations'),
    show: false,
    id: 'totalLocation',
  },
  {
    name: t('user.count_plans'),
    show: false,
    id: 'totalPlan',
  },
  {
    name: t('user.booking'),
    show: false,
    id: 'totalBooking',
  },
  {
    name: t('user.count_followers'),
    show: false,
    id: 'totalFollower',
  },
  {
    name: t('user.count_followings'),
    show: false,
    id: 'totalFollowing',
  },
  {
    name: t('user.count_report'),
    show: false,
    id: 'totalReport',
  },
];

export const getPhotoPostByUser = (items: any) =>
  (!!items?.serviceReviewedPost?.medias ||
    !!items?.medias ||
    !!items?.sourcePost?.medias) &&
  JSON.parse(
    items?.serviceReviewedPost?.medias ||
      items?.medias ||
      items?.sourcePost?.medias
  );

export const checkRoles = (roles: string) => {
  switch (roles) {
    case USER_ROLES.SUPER_ADMIN:
      return true;
    case USER_ROLES.ADMIN:
      return true;
    case USER_ROLES.MODERATOR:
      return false;
    case USER_ROLES.NORMAL_USER:
      return false;
    default:
      return false;
  }
};

export const getSelectOption = () => ({
  '': `${t('sweet.user.reason_select')}`,
  'Người dùng đã vi phạm quy tắc cộng đồng': `${t(
    'sweet.user.community_rules'
  )}`,
  'Người dùng có hành vi lừa đảo, gây rối cộng động hoặc cá nhân cụ thể': `${t(
    'sweet.user.deceptive'
  )}`,
  'Người dùng giả mạo': `${t('sweet.user.fake')}`,
});

export const getTitleHeaderView = (type: string) => {
  switch (type) {
    case DASHBOARD_TYPES.POST:
      return t('user.list_posts');
    case DASHBOARD_TYPES.LOCATION:
      return t('user.location.created');
    case MY_MAP_TYPES.WISH_CAME:
      return t('user.location.wish_list');
    case MY_MAP_TYPES.HAD_CAME:
      return t('user.location.completed');
    case DASHBOARD_TYPES.BOOKMARK:
      return t('user.location.saved');
    case DASHBOARD_TYPES.PLAN:
      return t('plan.title');
    default:
      return null;
  }
};

export const getScopeTypes = (type: string) => {
  switch (type) {
    case SCOPES_TYPES.WHERE:
      return t('scope.where');
    case SCOPES_TYPES.USER:
      return t('scope.user');
    case SCOPES_TYPES.STAY:
      return t('scope.stay');
    case SCOPES_TYPES.FOOD:
      return t('scope.food');
    case SCOPES_TYPES.POST:
      return t('scope.post');
    case SCOPES_TYPES.TOUR:
      return t('scope.tour');
    case SCOPES_TYPES.ACTIVITY:
      return t('scope.activity');
    default:
      return '';
  }
};

export const parseRoleTypes = (type: string) => {
  switch (type) {
    case t('roles.super_admin'):
      return ['super_admin'];
    case t('roles.admin'):
      return ['admin'];
    case t('roles.moderator'):
      return ['moderator'];
    case t('roles.normal_user'):
      return ['normal_user'];
    default:
      return '';
  }
};

export const getRolesByIdTypes = (type: string) => {
  switch (type) {
    case USER_ROLES.SUPER_ADMIN:
      return t('roles.super_admin');
    case USER_ROLES.ADMIN:
      return t('roles.admin');
    case USER_ROLES.MODERATOR:
      return t('roles.moderator');
    case USER_ROLES.NORMAL_USER:
      return t('roles.normal_user');
    default:
      return '';
  }
};

export const getRolesTypes = (type: string) => {
  switch (type) {
    case CUSTOM_ROLES_TYPES.ADMIN:
      return t('roles.admin');
    case CUSTOM_ROLES_TYPES.MODERATOR:
      return t('roles.moderator');
    case CUSTOM_ROLES_TYPES.NORMAL_USER:
      return t('roles.normal_user');
    default:
      return '';
  }
};

export const getIconRoles = (type: string) => {
  switch (type) {
    case USER_ROLES.SUPER_ADMIN:
      return Images.admin.default;
    case USER_ROLES.ADMIN:
      return Images.admin.default;
    case USER_ROLES.MODERATOR:
      return Images.mod.default;
    case USER_ROLES.NORMAL_USER:
      return Images.onShield.default;
    default:
      return '';
  }
};

export const getGenderTypes = () => [
  {
    name: t('app.profile.unspecified'),
    value: GENDER.UNSPECIFIED,
  },
  {
    name: t('app.profile.male'),
    value: GENDER.MALE,
  },
  {
    name: t('app.profile.female'),
    value: GENDER.FEMALE,
  },
];

export const getTypeUsers = (name: string) => {
  switch (name) {
    case GENDER.MALE:
      return t('profile.male');
    case GENDER.FEMALE:
      return t('profile.female');
    case GENDER.UNSPECIFIED:
      return t('profile.other');
    default:
      return '';
  }
};

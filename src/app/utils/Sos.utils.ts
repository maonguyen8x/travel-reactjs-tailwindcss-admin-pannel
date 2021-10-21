import { t } from 'app/i18n';

export const getFieldSos = () => [
  {
    id: 'image',
    name: t('sos.image'),
    show: true,
  },
  {
    id: 'users',
    name: t('sos.users'),
    show: true,
  },
  {
    id: 'phone',
    name: t('sos.phone'),
    show: true,
  },
  {
    id: 'rallyPoint',
    name: t('sos.rally_point'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('sos.created'),
    show: true,
  },
  {
    id: 'rescue',
    name: t('sos.rescue'),
    show: true,
  },
  {
    id: 'status',
    name: t('sos.status'),
    show: true,
  },
];

export const getFieldForum = () => [
  {
    id: 'users',
    name: t('sos.users'),
    show: true,
  },
  {
    id: 'phone',
    name: t('sos.phone'),
    show: true,
  },
  {
    id: 'join',
    name: t('sos.join'),
    show: true,
  },
  {
    id: 'status',
    name: t('sos.status'),
    show: true,
  },
  {
    id: 'action',
    name: t('sos.action'),
    show: true,
  },
];

export const getDataStatus = () => [
  {
    name: t('sos.activated'),
    value: 1,
  },
  {
    name: t('sos.safe'),
    value: 2,
  },
  {
    name: t('sos.warning'),
    value: 3,
  },
  {
    name: t('sos.deactivated'),
    value: 4,
  },
];

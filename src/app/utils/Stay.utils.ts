import { t } from 'app/i18n';

export const getFieldStay = () => [
  {
    id: 'name',
    name: t('stay.name'),
    show: true,
  },
  {
    id: 'locationId',
    name: t('stay.address'),
    show: true,
  },
  {
    id: 'name',
    name: t('stay.creator'),
    show: true,
  },
  {
    id: 'like',
    name: t('stay.like'),
    show: false,
  },
  {
    id: 'comment',
    name: t('stay.comment'),
    show: false,
  },
  {
    id: 'share',
    name: t('stay.share'),
    show: false,
  },
  {
    id: 'pointer',
    name: t('stay.average'),
    show: false,
  },
  {
    id: 'bookmark',
    name: t('stay.booknmark'),
    show: false,
  },
  {
    id: 'image',
    name: t('stay.image'),
    show: false,
  },
  {
    id: 'createdAt',
    name: t('stay.createdAt'),
    show: true,
  },
  {
    id: 'action',
    name: t('stay.action'),
    show: true,
  },
];

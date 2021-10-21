import { DASHBOARD_TYPES } from 'app/constants';
import { t } from '../../../../i18n';

export const DATA_SEARCH = [
  {
    height: 200,
    autocompleted: true,
    type: DASHBOARD_TYPES.USER,
    name: 'creatorId',
    label: t('search.advance.user'),
  },
  {
    autocompleted: true,
    type: DASHBOARD_TYPES.LOCATION,
    name: 'location',
    label: t('search.advance.location'),
  },
  {
    name: 'createdAt',
    label: t('search.advance.created'),
    type: 'date',
  },
];

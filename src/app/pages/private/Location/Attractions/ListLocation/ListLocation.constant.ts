import { DASHBOARD_TYPES } from 'app/constants';
import { t } from 'app/i18n';

export const DATA_SEARCH = [
  {
    height: 200,
    autocompleted: true,
    type: DASHBOARD_TYPES.USER,
    name: 'creatorId',
    label: t('search.advance.user'),
  },
  {
    name: 'createdAt',
    label: t('search.advance.created'),
    type: 'date',
  },
];

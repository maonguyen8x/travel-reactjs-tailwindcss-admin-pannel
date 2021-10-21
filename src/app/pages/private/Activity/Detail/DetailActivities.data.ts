/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { formatTime, formatMoney } from 'app/utils';

export const DATA = (values: any, currencies: any) => [
  {
    value: values?.address?.country,
    label: t('APP.ACTIVITIES.COUNTRY'),
  },
  {
    value: values?.address?.province,
    label: t('APP.ACTIVITIES.CITY'),
  },
  {
    value: values?.address?.district,
    label: t('APP.ACTIVITIES.DISTRIC'),
  },
  {
    value: values?.address?.ward,
    label: t('APP.ACTIVITIES.WARD'),
  },
  {
    value: values?.address?.street,
    label: t('APP.ACTIVITIES.STREET'),
  },
  {
    value: values?.address?.houseNumber,
    label: t('APP.ACTIVITIES.HOUSE_NUMBER'),
  },
  {
    value: values?.name,
    label: t('APP.ACTIVITIES.NAME'),
  },
  {
    value: formatMoney(
      currencies[values.currencyId - 1]?.code || 'VND',
      values?.price
    ),
    label: t('APP.ACTIVITIES.PRICE'),
  },
  {
    value: `${formatTime(values.from)}`,
    label: t('APP.ACTIVITIES.START_DAY'),
  },
  {
    value: `${formatTime(values.to)}`,
    label: t('APP.ACTIVITIES.END_DAY'),
  },
  {
    value: values?.participantCount,
    label: t('APP.ACTIVITIES.JOIN'),
  },
  {
    value: formatTime(values?.createdAt),
    label: t('APP.ACTIVITIES.CREATED'),
  },
];

/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { getFieldProps } from 'app/utils';

export const dataCategoryAmenity = (props: any) => [
  {
    field: getFieldProps('AmenityVi', props),
    label: t('APP.AMENITY_CATEGORY.VIETNAM'),
    md: 6,
    Col: 'Col',
  },
  {
    field: getFieldProps('AmenityEn', props),
    label: t('APP.AMENITY_CATEGORY.ENGLISH'),
    md: 6,
    Col: 'Col',
  },
];

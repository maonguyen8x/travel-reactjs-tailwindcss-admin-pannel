/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { getFieldProps } from 'app/utils';

export const dataAmenity = (props: any) => [
  {
    field: getFieldProps('amenityCategoryId', props),
    label: 'Amenity Category Id',
    md: 6,
    Col: 'Col',
    disabled: true,
  },
  {
    field: getFieldProps('amenityVi', props),
    label: t('APP.AMENITY.VIETNAM'),
    md: 6,
    Col: 'Col',
  },
  {
    field: getFieldProps('amenityEn', props),
    label: t('APP.AMENITY.ENGLISH'),
    md: 6,
    Col: 'Col',
  },
];

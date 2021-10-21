/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { getFieldProps } from 'app/utils';

export const dataCategoryFacility = (props: any) => [
  {
    field: getFieldProps('FacilityVi', props),
    label: t('APP.FACILITY_CATEGORY.VIETNAM'),
    md: 6,
    Col: 'Col',
  },
  {
    field: getFieldProps('FacilityEn', props),
    label: t('APP.FACILITY_CATEGORY.ENGLISH'),
    md: 6,
    Col: 'Col',
  },
];
